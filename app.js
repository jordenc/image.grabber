'use strict';

const Homey 	=	require('homey');
const fetch = require('node-fetch');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


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
				
				const myImage = new Homey.Image();
				myImage.setStream(async (stream) => {
				  const res = await fetch(args.url);
				  if(!res.ok)
				    throw new Error('Invalid Response');
				
				  return res.body.pipe(stream);
				});
				myImage.register().then(() => {
					
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
					
				}).catch(console.error);

				return Promise.resolve( true );

			})
			
		grabProtectedImageAction
			.register()
			.registerRunListener ((args, state) => {
			
				console.log('Grabbing PW image: ' + args.url);
				
				if (args.sendImmediately == "false") var sendImmediately = false; else var sendImmediately = true;
				
				const myImage = new Homey.Image();
				myImage.setStream(async (stream) => {
					
				  headers.set('Authorization', 'Basic ' + Buffer.from(args.username + ":" + args.password).toString('base64'));
					
				  const res = await fetch(args.url, {headers: headers});
				  if(!res.ok)
				    throw new Error('Invalid Response');
				
				  return res.body.pipe(stream);
				});
				myImage.register().then(() => {
					
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
					
				}).catch(console.error);

				return Promise.resolve( true );
								
			})
	}
}

module.exports = App;