// JavaScript Document

var http = require("http");

exports.runTest = function( options, numrequests, done ){
	var numrequestsleft = numrequests;
	for( var i = 0; i < numrequests; i++ ){
		var testreq = http.request(options, function(testres) {
			//console.log('STATUS: ' + testres.statusCode);
			//console.log('HEADERS: ' + JSON.stringify(testres.headers));
			testres.setEncoding('utf8');
			testres.on('data', function (chunk) {
				//don't both saving any of the data
				//page += chunk;
			});
			testres.on('end', function(){
				numrequestsleft--;
				if( numrequestsleft == 0 ){
					done();
				}
			});
		});
		
		testreq.on('error', function(e) {
			console.log('problem with request: ' + e.message);
		});
		
		testreq.end();
	}
}