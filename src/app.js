const express = require('express');
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const file_ops = require('./tinkering/delete-files');
const async_tinkering = require('./tinkering/async-tinkering');

// static is middleware and calls next()
// app.use() means it is called on every request
app.use(express.static('public'));
app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));


mongoose
	.connect("mongodb://localhost/tddDB", {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true
	})
	.then(() =>
		console.log(`Connected to MongoDB at mongodb://localhost/tddDB...`)
	)
	.catch(err => {
		console.log("Failed to connect to MongoDB...", err);
		process.exit();
	});

const usersRouter = require("./routes/user.route");
app.use("/api/users", usersRouter);

// app handlers
function testFunction(req, res, next){
	res.send('here we go!');
	next();
}
app.get('/test', testFunction);

function promiseResolve(req, res, next) {
	async_tinkering.returnsAPromise(true)
		.then((result) => {
			res.status(200).send(result);
		})
		.catch((error) => {
			return next(error);
		});
}
app.get('/promise-resolve', promiseResolve);

function promiseReject(req, res, next) {
	async_tinkering.returnsAPromise(false)
		.then((result) => {
			res.status(200).send(result);
		})
		.catch((error) => {
			return next(error);
		});
}
app.get('/promise-reject', promiseReject);

function getSomeFiles (res, next) {
	async_tinkering.promisifyFS('fixtures/test_0.txt')
		.then((result) => {
			res.status(200).send(result.toString('utf-8'))
		})
		.catch((error) => {
			return next(error)
		})
}
app.get('/promisify', (req, res, next) => {
	getSomeFiles(res, next);
});

app.get('/await', async (req, res, next) => {

	try {
		const result = await async_tinkering.promisifyFS('fixtures/test_0.txt');
		res.status(200).send(result.toString());
	}
	catch(error){
		next(error);
	}

});

app.get('/delete-files', (req, res) => {
	file_ops.deleteFiles();
	res.status(200).send('OK BABY');
});

// next steps:
// add the POST createUser function in a TDD way
// write a unit test for one of the controller functions
// and move it to it's own controller file: https://www.techighness.com/post/unit-testing-expressjs-controller-part-1/



app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

module.exports = app;
