const fs = require("fs");
const path = require("path");

// what does deleteFiles return?
// how does app.get know if it's a success or not?
// how do we handle the 2 errprs?


exports.deleteFiles = function() {

	const directory = "fixtures";
	fs.readdir(directory, (err, files) => {
		if (err) {
			handleError(err);
		}
		else {
			for (const file of files) {
				fs.unlink(path.join(directory, file), (err) => {
					if (err) {
						handleError(err);
					}
					else {
						return "OK";
					}
				});
			}
		}
	});
};

const handleError = function(err){
	console.log(`Error deleting files: ${err.message}`);
};
