const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { User } = require("../models/user.model");

router.route("/")
	.get(async (req, res) => {
		let users = await User.find();
		return res.send(users);
	});

router.route("/:id")
	.get(async (req, res) => {
		let userId = req.params.id;

		if (!mongoose.Types.ObjectId.isValid(userId)) {
			return res.status(400).send("Invalid object id");
		}

		let user = await User.findById(userId);
		if (!user) {
			return res.status(404).send("User not found");
		}

		return res.send(user);
	});

module.exports = router;
