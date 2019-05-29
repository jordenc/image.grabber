# Homey ImageGrabber 

Enter the URL of an image into this app and it will be available as "Image token" for use with other apps. For example, use the snapshot URL of your webcam with the grabber, and send the 'image' token to the Telegram app.

The app features 2 cards:

[ACTION] Grab image (enter URL to an image)
[TRIGGER] Image was grabbed (contains the base64 encoded image data in a token, for use in compatible apps such as the Homey Telegram app)

Please note, only JPG files are supported.

Password protected URL's are also possible. You need to add the username and password to the URL of the snapshot URL, in this way:
http://[USERNAME]:[PASSWORD]@[SNAPSHOTURL]

Replace [USERNAME] and [PASSWORD] with the username and password, and place the rest of the snapshot URL instead of [SNAPSHOTURL]. Please note that this only works for password popups, not for forms.

**Want to show your appreciation for this app? A donation is possible via http://www.d2c.nl **

**Version 0.1.5**
- Support for new Homey 2.2.0 Image SDK

**Version 0.1.4**
- Added German language (Thanks mapulu!)

**Version 0.1.3**
- Changed category to "Tools"

**Version 0.1.2**
- Bugfix

**Version 0.1.1**
- New action card to grab password protected URL's, enabling to grab images from Dahua cams and other "Digest auth"-protected cams and URL's. For Dahua and other Digest Auth-cams select to send login "Not immediately".

**Version 0.1.0**
- Official Homey Image Tokens now supported. This means you can use the tokens with all other supported apps.
- Now Homey SDK v2 ready

**Version 0.0.3**
- Detailed information about how to use username/password combinations.
- The URL is now also given as a token with the trigger, so you can now see which URL has triggered the "Image has been grabbed"-card. This means, better usability if you set up multiple image triggers.

**Version 0.0.2**
- https URL's with invalid certificates now also work.

**Version 0.0.1**
- First released version
