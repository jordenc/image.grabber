"use strict";

var request = require('request').defaults({ encoding: null });


function init() {
	
	Homey.log("Image Grabber started");
	
}

module.exports.init = init;

Homey.manager('flow').on('action.grabimage', function (callback, args) {
	
	request.get(args.url, function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	        
	        Homey.manager('flow').trigger('imagegrabbed', {image: new Buffer(body).toString('base64')});
			callback (null, true);
			
	    } else {
		    
		    callback (error, false);
		    
	    }
	});


});