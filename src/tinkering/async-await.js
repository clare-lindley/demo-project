'use strict'

// our async function
const getOne = async _ => {
	return 1;
}

// calling it with .then()
// getOne()
// 	.then(result => {
// 		console.log(result) // 1
// 	})

// calling it with await
const test = async _ => {
	const one = await getOne();
	console.log(one); // 1
}

test();

// declare a function as async it always returns a promise
