const express = require('express')
const app = express()
const port = 3000
const file_ops = require('./delete-files');
const async_tinkering = require('./async-tinkering');

app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));

app.get('/promise-resolve', (req, res, next) => {
	async_tinkering.returnsAPromise(true)
		.then((result) => {
			res.status(200).send(result);
		})
		.catch((error) => {
			return next(error);
		});
});

app.get('/promise-reject', (req, res, next) => {
	async_tinkering.returnsAPromise(false)
		.then((result) => {
			res.status(200).send(result);
		})
		.catch((error) => {
			return next(error);
		});
});

app.get('/delete-files', (req, res) => {
	file_ops.deleteFiles();
	res.status(200).send('OK BABY');
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
