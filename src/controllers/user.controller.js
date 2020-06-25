"use strict";

const { User } = require("../models/user.model");

module.exports.createUser = async (req, res, next) => {

	try {
		const newUser = await User.create({
			name: req.body.name,
			email: req.body.email,
			gender: req.body.gender
		});
		res.send(newUser);
		next();
	}
	catch(e) {
		res.send(e.message);
		next();
	}

};
