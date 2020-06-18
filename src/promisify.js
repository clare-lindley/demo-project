const fs = require('fs');
const { promisify } = require('util')

// this is the equivalent of the signature of readFile
// here's our pretend async API
// it does its thing and handles the errors
// and calls the callback accordingly
const getSumAsync = (num1, num2, callback) => {

	if (!num1 || !num2) {
		return callback(new Error("Missing arguments"), null);
	}
	return callback(null, num1 + num2);
}

const getSumPromise = promisify(getSumAsync) // step 1

getSumPromise(1,2) // step 2
	.then(result => {
		console.log(result)
	})
	.catch(err => {
		console.log(err.message)
	})


// this is the equivalent of CALLING fs.readfile
// the implementation of getSumAsync is responsible for detecting errors
// and passing them to the callback for the client code to handle.
// getSumAsync(1, 1, (err, result) => {
// 	if (err){
// 		console.log(err)
// 	}else {
// 		console.log(result) // 2
// 	}
// })


