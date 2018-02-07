var env = require("dotenv").config();
var keys = require("./keys");

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

var request = require('request');


switch (process.argv[2]){
    
    case 'my_tweets':
    
    client.get('statuses/user_timeline', {screen_name: 'comradehutch', count: 20}, function(error, tweets, response) {
        if (error) {
            console.log("Error");
        }
        else{
            var counter = 1;
            for(var i = 0; i < tweets.length; i++){
              var element = tweets[i];
              var text = counter++ + '. ' + element.text + '\n'
              console.log(text);
        }
      }
    });
    return;
    break;

    case 'spotify_this_song':

    var arg = process.argv[3]

    spotify.search({ type: 'track', query: arg, limit: 1 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        else{
            var songsArray = data.tracks.items;
            var songSelection = {};
            for (var i = 0; i < songsArray.length; i++) {
                var element = songsArray[i],
                songSelection = {
                        songArtist: "Artist: " + element.artists[0].name + '\n',
                        songName: "Song Name: " + element.name + '\n',
                        songPreview: "Preview URL: " + element.preview_url + '\n',
                        songAlbum: "Album Name: " + element.album.name
                    }
                for (var i in songSelection) {
                    console.log(songSelection[i]);
                }
            }
        }
      //console.log(JSON.stringify (data.tracks.items[0], null, 1)); 
      });
    return;
    break;

    case 'movie_this':

    var arg = process.argv[3]

    // request('http://www.omdbapi.com/?apikey=trilogy&t=Mr.+Nobody', function(error, response, body){
    //     if (error) {
    //       console.log("Error");
    //     }
    //     else if(response.statusCode === 200) {
    //         console.log("");
    //         console.log("Title: " + JSON.parse(body).Title);
    //         console.log("");
    //         console.log("Year: " + JSON.parse(body).Year);
    //         console.log("");
    //         console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
    //         console.log("");
    //         console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
    //         console.log("");
    //         console.log("Country: " + JSON.parse(body).Country);
    //         console.log("");
    //         console.log("Language: " + JSON.parse(body).Language);
    //         console.log("");
    //         console.log("Plot: " + JSON.parse(body).Plot);
    //         console.log("");
    //         console.log("Actors: " + JSON.parse(body).Actors); 
    //     }
    //   }
    // );
    // return;

    var userInput = arg;
    var movieName = userInput;

    request('http://www.omdbapi.com/?apikey=trilogy&t=' + movieName, function(error, response, body){
        if (error) {
          console.log("Error");
        }
        else if(response.statusCode === 200) {
            console.log("");
            console.log("Title: " + JSON.parse(body).Title);
            console.log("");
            console.log("Year: " + JSON.parse(body).Year);
            console.log("");
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("");
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("");
            console.log("Country: " + JSON.parse(body).Country);
            console.log("");
            console.log("Language: " + JSON.parse(body).Language);
            console.log("");
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("");
            console.log("Actors: " + JSON.parse(body).Actors); 
        }
      }
    );
    return;
    break;

    case 'do_what_it_says':
    var filename = 'random.txt'

    fs.readFile(filename, 'utf8', function (err, data) {
        if (err) throw err;
        //use text to call one of LIRI's commands
    });
    break;
}

//Alternative code for Spotify

// process.argv[3] = 
// spotify.request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
// .then(function (data) {
//     spotObj = {
//         artists: data.artists[0].name,
//         songName: data.name,
//         songLink: data.preview_url,
//         album: data.album.name
//     }
//     for (var i in spotObj) {
//         console.log(spotObj[i]);
//     }
// })
// .catch(function (err) {
//     console.error('Error occurred: ' + err);
// });
// return;





// if(process.argv[2] === 'spotify_this_song'){
//     output = process.argv[3];
//     console.log(output);
// }
// else {
//     console.log("error");
// }