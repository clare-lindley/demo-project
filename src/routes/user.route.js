"use strict";

const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const { createUser } = require("../controllers/user.controller");
const { User } = require("../models/user.model");

router.route("/")
	.get(async (req, res, next) => {
		const users = await User.find();
		res.send(users);
		next();
	})
	.post(async (req, res, next) => {
		await createUser(req, res, next);
	});

router.route("/:id")
	.get(async (req, res, next) => {
		const userId = req.params.id;

		if (!mongoose.Types.ObjectId.isValid(userId)) {
			res.status(400).send("Invalid object id");
		}

		const user = await User.findById(userId);
		if (!user) {
			res.status(404).send("User not found");
		}

		res.send(user);
		next();
	});

module.exports = router;
