var env = require("dotenv").config();
var keys = require("./keys");

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

var request = require('request');


switch (process.argv[2]){
    
    case 'my_tweets':
    
    var params = {
        screen_name: 'comradehutch', 
        count: 20
    };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
          var counter = 1;
          for(var i = 0; i < tweets.length; i++){
            var element = tweets[i];
            var twitterText = counter++ + '. ' + element.text + '\n'
            console.log(twitterText);
          }
      }
    });
    break;

    case 'spotify_this_song':
    //Need to find way to get process.argv[3]
    spotify.request('https//:api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
    .then(function (data) {
        spotObj = {
            artists: data.artists[0].name,
            songName: data.name,
            songLink: data.preview_url,
            album: data.album.name
        }
        for (var i in spotObj) {
            console.log(spotObj[i]);
        }
    })
    .catch(function (err) {
        console.error('Error occurred: ' + err);
    });
    return;
    break;

    case 'movie_this':
    requestCall.get('http://www.omdbapi.com/?apikey=trilogy&t=' + editInput, function (error, response, body) {
        
                var parsedVar = JSON.parse(body);
        
                if (parsedVar.Response === 'False') {
                    console.log("Movie N/A")
                    return
                }
        
                var movieObj = {
                    movieTitle: 'Title: ' + parsedVar.Title,
                    movieYear: 'Year: ' + parsedVar.Year,
                    movieIMDBRating: 'IMDB Rating: ' + parsedVar.imdbRating,
                    movieRTRatings: 'Rotten Tomatoes Rating: ' + parsedVar.Ratings[1].Value,
                    movieCountry: 'Country: ' + parsedVar.Country,
                    movieLanguage: 'Language: ' + parsedVar.Language,
                    moviePlot: 'Plot: ' + parsedVar.Plot,
                    movieActors: 'Actors: ' + parsedVar.Actors
                }
        
                for (var i in movieObj) {
                    console.log(movieObj[i]);
                }
            });

            //Need to add Mr. Nobody for if user does not enter a film
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





if(process.argv[2] === 'spotify_this_song'){
    outputNum = process.argv[3];
    console.log(outputNum);
}
else {
    console.log("error");
}