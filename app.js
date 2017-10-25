'use strict';

const Homey 	=	require('homey');
const request	=	require('request').defaults({ encoding: null });

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

//var request = require('request').defaults({ encoding: null });

class App extends Homey.App {
	
	onInit() {
	
		let grabImageAction = new Homey.FlowCardAction('grabimage');
		
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
				        
				        myImage.setPath('/userdata/image.jpg');
					    myImage.register()
					        .then(() => {
					
					            // create a token & register it
					            let myImageToken = new Homey.FlowToken('image', {
					                type: 'image',
					                title: args.url
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