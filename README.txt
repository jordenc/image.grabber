Enter the URL of an image into this app and it will be available as "Image token" for use with other apps. For example, use the snapshot URL of your webcam with the grabber, and send the 'image' token to the Telegram app.

The app features 2 cards:

[ACTION] Grab image (enter URL to an image)
[TRIGGER] Image was grabbed (contains the base64 encoded image data in a token, for use in compatible apps such as the Homey Telegram app)

Please note, only JPG files are supported.

Password protected URL's are also possible. You need to add the username and password to the URL of the snapshot URL, in this way:
http://[USERNAME]:[PASSWORD]@[SNAPSHOTURL]

Replace [USERNAME] and [PASSWORD] with the username and password, and place the rest of the snapshot URL instead of [SNAPSHOTURL]. Please note that this only works for password popups, not for forms.
