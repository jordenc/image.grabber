"use strict";

const request	=	require('request').defaults({ encoding: null });

request.get("https://www.sportfotografie.nl/500px/Jan2019/fafds%20carlsen.jpg", {}, function (error, response, body) {

	console.log(" body = " + body);

});
