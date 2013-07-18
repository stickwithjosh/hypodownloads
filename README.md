##HYPOdownloads

Problem: I don't really have any idea how many people are listening to my podcasts[1] and the files are stored in s3, so it's not easy to figure that out. In fact, I'll never really know how many people *listen* but it would be nice to at least get an idea of how many people are *downloading* the shows.

Solution: Stick a small node app in between the user and the files they are downloading. This app just redirects to the correct mp3 documents a download to mongo and gets on with it's business. With a bit more thought and fiddling I could probably add a interstitial page to grab more data on the user (location? technology stack?) but this is cool for now.

You probably shouldn't use this, I'll document it here if it works for me.

1. http://internetpodcasts.com
