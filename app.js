'use strict';

const Homey 	=	require('homey');
const request	=	require('request').defaults({ encoding: null });

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

//var request = require('request').defaults({ encoding: null });

class App extends Homey.App {
	
	onInit() {
	
		let grabImageAction = new Homey.FlowCardAction('grabimage');
		
		let grabProtectedImageAction = new Homey.FlowCardAction('grabprotectedimage');
		
		let imageGrabbed = new Homey.FlowCardTrigger('imagegrabbed')
			.register()
		    .registerRunListener( (args, state ) => {
				
		        return Promise.resolve( true );
		
		    })
		
		grabImageAction
			.register()
			.registerRunListener ((args, state) => {
			
				console.log('Grabbing ' + args.url);
				
				request.get(args.url, {}, function (error, response, body) {
				    if (!error && response.statusCode == 200) {
				        
				        console.log('Done!');
				        
				        let myImage = new Homey.Image('jpg');
				        
				        //myImage.setPath('/userdata/image.jpg');
				        myImage.setBuffer (body);
					    myImage.register()
					        .then(() => {
					
					            // create a token & register it
					            let myImageToken = new Homey.FlowToken('image', {
					                type: 'image',
					                title: 'image'
					            })
					            
					            myImageToken
					                .register()
					                .then( () => {
					                    myImageToken.setValue( myImage )
					                        .then( console.log( 'setValue') )
					                })
								
						        // trigger a Flow
						        imageGrabbed
					                .trigger({
					                    image: myImage,
					                    url: args.url
					                })
					                .then( console.log( 'imagegrabbed') )
						    })
						
				    } else {
					    
					    console.log('Error: ' + error);
					    return Promise.resolve( false );  
					    
				    }
				});
			})
			
		grabProtectedImageAction
			.register()
			.registerRunListener ((args, state) => {
			
				console.log('Grabbing PW image: ' + args.url);
				
				if (args.sendImmediately == "false") var sendImmediately = false; else var sendImmediately = true;
				
				request.get(args.url, {
				  'auth': {
				    'user': args.username,
				    'pass': args.password,
				    'sendImmediately': sendImmediately
				  }}, function (error, response, body) {
				    if (!error && response.statusCode == 200) {
				        
				        console.log('Done!');
				        
				        let myImage = new Homey.Image('jpg');
				        
				        //myImage.setPath('/userdata/image.jpg');
				        myImage.setBuffer (body);
					    myImage.register()
					        .then(() => {
					
					            // create a token & register it
					            let myImageToken = new Homey.FlowToken('image', {
					                type: 'image',
					                title: 'Image'
					            })
					            
					            myImageToken
					                .register()
					                .then( () => {
					                    myImageToken.setValue( myImage )
					                        .then( console.log( 'setValue') )
					                })
								
						        // trigger a Flow
						        imageGrabbed
					                .trigger({
					                    image: myImage,
					                    url: args.url
					                })
					                .then( console.log( 'imagegrabbed') )
						    })
						
				    } else {
					    
					    console.log('Error: ' + error);
					    return Promise.resolve( false );  
					    
				    }
				});
			})
			
	}
}

module.exports = App;