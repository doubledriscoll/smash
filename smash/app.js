// JavaScript Document

var child = require("child_process");
var smash = require("./smash");
var app = require("express").createServer();
var numCPUs = require('os').cpus().length;

console.log('========================================');

var workers = [];

function spawnWorkers(){
	console.log('Starting up with ' + numCPUs + ' workers');
	for( var i = 0; i < numCPUs; i++ ){
		var n = child.fork(__dirname + '/child.js');
		n.on('message', function(m) {
		  console.log('PARENT got message:', m);
		});
		//n.send({ hello: 'world' });
		workers.push(n);
	}
};
spawnWorkers();


app.get("/", function( req,res ){
    res.writeHeader(200, {"Content-Type": "text/html"}); 
	
	var start = new Date().getTime();
	
	var workersLeft = workers.length;
	for( var w in workers ){
		workers[w].once('message', function(m){
			//console.log('child is done:', m);
			workersLeft--;
			if( workersLeft == 0 ){
				
				var stop = new Date().getTime();
				var taken = stop-start;
				res.write( 4000 + " requests took " + taken + " ms | " + (Math.round( 4000/taken * 100 ) / 100 * 1000) + " requests per second\n" );
				res.end();
				//res.write("done");
				res.end();
			}
		});
		workers[w].send({ key: 'value' });
	}
	
			
	/*var numrequests = 1000;
	
	var start = new Date().getTime();
	smash.runTest({ host: 'localhost', port: 80, path: '/', method: 'GET' }, numrequests,
		function(){
			var stop = new Date().getTime();
			var taken = stop-start;
			res.write( numrequests + " requests took " + taken + " ms | " + (Math.round( numrequests/taken * 100 ) / 100 * 1000) + " requests per second\n" );
			res.end();
		}
	);*/
	
});

app.listen(3333);