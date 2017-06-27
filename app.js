"use strict";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var request = require('request').defaults({ encoding: null });


function init() {
	
	Homey.log("Image Grabber started");
	
}

module.exports.init = init;

Homey.manager('flow').on('action.grabimage', function (callback, args) {
	
	Homey.log ('Grabbing ' + args.url);
	
	request.get(args.url, {
		'auth': {
	    'user': args.username || false,
	    'pass': args.password || false,
	    'sendImmediately': false
	  }
		
	}, function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	        
	        Homey.log ('Done!');
	        Homey.manager('flow').trigger('imagegrabbed', {image: new Buffer(body).toString('base64')});
			callback (null, true);
			
	    } else {
		    
		    Homey.log ('Error: ' + error);
		    callback (error, false);
		    
	    }
	});


});