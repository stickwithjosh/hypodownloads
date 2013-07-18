// Grab some requirenments

var http = require('http');
var r = require('request');
var mongojs = require('mongojs');
var db = mongojs('podcast', ['downloads']);

http.createServer(function (req, res) {
    var urlz = req.url;
    if(urlz == '/sofar') {

        db.downloads.find().count(function(err, count) {
            if( err || !count ) {
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end('Something is terribly broken, sorry (it\'s much more likely that your total is zero) \n');
            }
            var totalz = count;
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('So far? \n' + totalz);
        });
   } else {

    // Log that noise to the console, for testing
    //
    // We only want urlz that are mp3z.
    // Have you noticed I like adding zs
    // to variables? Becauze I do.
    if (urlz.toLowerCase().indexOf(".mp3") >= 0){

        // Build our link
        var download_link = 'http://m.hypotheticalpodcast.com/media/e' + urlz;

        // add to the dbizzle aka the database
        db.downloads.save({
            url: urlz,
            date: new Date().getTime()
        }, function(err, saved) {
              if( err || !saved ) console.log("Nope");
                else {
                    db.downloads.find().count(function(err, count) {console.log(count)});
                }
        });
       // get the link, send it to the user
        r.get(download_link).pipe(res);

    }
    else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('I\'m certain I have no idea what you are talking about.');
    }

   }
}).listen(1337, '127.0.0.1');
