// JavaScript Document

var smash = require("./smash");

process.on('message',function(m){
	//console.log('CHILD got message:', m);
	smash.runTest({ host: 'localhost', port: 80, path: '/', method: 'GET' }, 1000,
		function(){
			process.send({ message: 'done' });
		}
	);
});


process.on('smash',function(m){
	console.log(m);
});
