const util = require('util');
const fs = require('fs');

const stat = util.promisify(fs.stat);

// get it working
// ask... who does the .then and the .catch?

stat('package.json').then((stats) => {
	console.log(stats);
}).catch((error) => {
	console.log(error);
});
