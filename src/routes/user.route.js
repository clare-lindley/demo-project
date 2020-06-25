const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const { createUser } = require("../controllers/user.controller");
const { User } = require("../models/user.model");

router.route("/")
	.get(async (req, res) => {
		const users = await User.find();
		return res.send(users);
	})
	.post(async (req, res) => {
		await createUser(req, res);
	});

router.route("/:id")
	.get(async (req, res) => {
		const userId = req.params.id;

		if (!mongoose.Types.ObjectId.isValid(userId)) {
			return res.status(400).send("Invalid object id");
		}

		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).send("User not found");
		}

		return res.send(user);
	});

module.exports = router;
