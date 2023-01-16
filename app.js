'use strict';

const Homey 	=	require('homey');
const fetch = require('node-fetch');

class App extends Homey.App {
	
	async onInit() {

		this.imagegrabbed = this.homey.flow.getTriggerCard('imagegrabbed');

		this.grabImageAction = this.homey.flow.getActionCard('grabimage')
			.registerRunListener(async (args) => {
				console.log('Grabbing ' + args.url);

				if (args.url.substr(0, 8) == 'https://') {

					console.log('set URL to createimage');
					const myImage = await this.homey.images.createImage();
					// the URL must start with https://
					myImage.setUrl(args.url);

					// Trigger event
					this.imagegrabbed
						.trigger({
							image: myImage,
							url: args.url
						})
						.then(console.log('Trigger imagegrabbed'))
						.catch(this.error)

				} else {

					console.log('URL does not start with https:// - grab manually');

					const myImage = await this.homey.images.createImage();

					await myImage.setStream(async (stream) => {
						const res = await fetch(args.url);
						if (!res.ok) {
							throw new Error("Invalid Response");
						}

						return res.body.pipe(stream);
					})

					// Trigger event
					this.imagegrabbed
						.trigger({
							image: myImage,
							url: args.url
						})
						.then(console.log('Trigger imagegrabbed'))
						.catch(this.error);

				}

			});
		
		this.grabProtectedImageAction = this.homey.flow.getActionCard('grabprotectedimage')
			.registerRunListener(async (args) => {
				console.log('Grabbing PW image: ' + args.url);

				if (args.sendImmediately == "false") var sendImmediately = false; else var sendImmediately = true;

				const myImage = await this.homey.images.createImage();
				await myImage.setStream(async (stream) => {

					headers.set('Authorization', 'Basic ' + Buffer.from(args.username + ":" + args.password).toString('base64'));

					const res = await fetch(args.url, {headers: headers});
					if(!res.ok)
						throw new Error('Invalid Response');

					return res.body.pipe(stream);
				});

				// Trigger event
				this.imagegrabbed
					.trigger({
						image: myImage,
						url: args.url
					})
					.then(console.log('Trigger imagegrabbed'))
					.catch(this.error);

			});
	}
}

module.exports = App;