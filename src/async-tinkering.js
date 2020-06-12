


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
