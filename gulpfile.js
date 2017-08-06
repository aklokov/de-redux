const fs = require('fs');
const tasks = fs.readdirSync('./gulp');

tasks.forEach(function(task) {
	const path = './gulp/' + task;
	if(fs.lstatSync(path).isFile()) {
		require(path);
	}
});