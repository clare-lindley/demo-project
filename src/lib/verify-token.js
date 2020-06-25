const jwt = require("jsonwebtoken");

const app_constants = require("../../src/lib/constants");

module.exports.verifyToken = function (req, res, next){

	let auth_header = req.headers.authorization;
	if (!auth_header)
		return res.status(403).send(app_constants.UNAUTHORISED_MSG);

	let token = auth_header.split(" ")[1];
	
	try{
		jwt.verify(token, app_constants.SECRET);
		next();
	}
	catch(err){
		return res.status(401).send(app_constants.INVALID_TOKEN_MSG);
	}

};
