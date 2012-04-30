// JavaScript Document

var smash = require("./smash");
var server = require("express").createServer();

server.get("/",function(req,res){
	smash.runTest({ host: 'localhost', port: 80, path: '/', method: 'GET' }, 4000,
		function(){
			res.write("done");
			res.end();
		}
	);
});

server.listen(3334);