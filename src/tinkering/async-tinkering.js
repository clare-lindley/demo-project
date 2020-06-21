const fs = require('fs');
const util = require('util');


exports.returnsAPromise = function(success) {

	let myFirstPromise = new Promise((resolve, reject) => {

		if(success){
			setTimeout( function() {
				resolve("Success!")  // Yay! Everything went well!
			}, 250);
		}
		else {
			reject("Failure :(");
		}

	});

	return myFirstPromise;

}

exports.readFileWithCallback = function() {

	fs.readFile('/etc/passwd', (err, data) => {
		if (err) {
			return err;
		}
		else {
			return data;
		}
	});

	return 'returning to express';
}

exports.promisifyFS = util.promisify(fs.readFile);

