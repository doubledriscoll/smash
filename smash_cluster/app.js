// JavaScript Document

var app = require("express").createServer();
var http = require("http");

console.log('========================================');

var workers = [];

app.get("/", function( req,res ){
    res.writeHeader(200, {"Content-Type": "text/html"}); 
	
	var start = new Date().getTime();
	
	
	var testreq = http.request({ host: 'localhost', port: 3334, path: '/', method: 'GET' }, function(testres) {

		testres.setEncoding('utf8');
		testres.on('data', function (chunk) {
			//don't both saving any of the data
			//page += chunk;
		});
		testres.on('end', function(){
			//numrequestsleft--;
			//if( numrequestsleft == 0 ){
			//	done();
			//}
			
		
			var stop = new Date().getTime();
			var taken = stop-start;
			res.write( 4000 + " requests took " + taken + " ms | " + (Math.round( 4000/taken * 100 ) / 100 * 1000) + " requests per second\n" );
			res.end();
		});
	});
	
	testreq.on('error', function(e) {
		console.log('problem with request: ' + e.message);
	});
	
	testreq.end();
});

app.listen(3333);