"use strict";

const { User } = require("../models/user.model");

module.exports.createUser = async (req, res) => {

	try {
		const newUser = await User.create({
			name: req.body.name,
			email: req.body.email,
			gender: req.body.gender
		});
		return res.send(newUser);
	}
	catch(e) {
		return res.send(e.message);
	}

};
