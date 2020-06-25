"use strict";

const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const app = express();
const app_constants = require("../src/lib/constants");
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
	.connect("mongodb://localhost/demoAPIDB", {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true
	})
	.then(() =>
		console.log("Connected to MongoDB at mongodb://localhost/demoAPIDB...")
	)
	.catch(err => {
		console.log("Failed to connect to MongoDB...", err);
		// eslint-disable-next-line no-undef
		process.exit();
	});

const usersRouter = require("./routes/user.route");

app.post("/api/login", (req, res, next) => {

	// generate and return token
	const accessToken = jwt.sign({ username: "clare"}, app_constants.SECRET);
	res.json({
		accessToken
	});

	next();
});

app.use("/api/users", usersRouter);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

module.exports = app;
