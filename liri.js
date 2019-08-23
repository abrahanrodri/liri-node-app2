require("dotenv").config();
var keys = require('./keys');
var request = require('request');
var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify);
var moment = require('moment');
var fs = require('fs');

var word1 = process.argv[2];
var word2 = process.argv.slice(3).join("+");

function switchCase() {
    switch (word1) {
        case "spotify-this-song":
            searchSpotify();
            break;
        case "concert-this":
            searchBands();
            break;
        case "movie-this":
            searchOMDB();
            break;
    }
}

function searchSpotify() {
    var songName = word2

    if (songName == "") {
        spotify.search({ 
            type: 'track', 
            query: "Happy"
        }, function (err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
            }
            var artist = data.tracks.items[0].album.artists[0].name
            var title = data.tracks.items[0].name
            var link = data.tracks.items[0].album.external_urls.spotify
            var album = data.tracks.items[0].album.name

            console.log("try ")
            console.log("Artist: " + artist);
            console.log("Song Title: " + title);
            console.log("Preview Link: " + link);
            console.log("Album: " + album)

            fs.appendFile("log.txt", "***********************DATA********************************" + 
            "\nCommand: " + word1 + 
            "\nSearch: " + songName + 
            "\nArtist: " + artist + 
            "\nSong Title: " + title + 
            "\nPreview Link: " + link + 
            "\n ", function (err) {
                if (err) {
                    return console.log(err);
                }
            })
        });
    }
    else {
        spotify.search({ type: 'track', query: songName, limit: 1 }, function (err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
            }
            var artist = data.tracks.items[0].album.artists[0].name
            var title = data.tracks.items[0].name
            var link = data.tracks.items[0].album.external_urls.spotify
            var album = data.tracks.items[0].album.name
            console.log("Artist: " + artist);
            console.log("Song Title: " + title);
            console.log("Preview Link: " + link);
            console.log("Album: " + album)

            fs.appendFile("log.txt", "***********************DATA********************************" + 
            "\nCommand: " + word1 + 
            "\nSearch: " + songName + 
            "\nArtist: " + artist + 
            "\nSong Title: " + title + 
            "\nPreview Link: " + link + 
            "\n ", function (err) {
                if (err) {
                    return console.log(err);
                }
            });
        });
    }
}

function searchBands() {

    var bandName = word2
    var queryUrl = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp"

    request(queryUrl, function (err, response, data) {
        if (err && response.statusCode != 200) {
            console.log('error:', err);
            console.log('statusCode:', response && response.statusCode);
        }

        var jsonDat = JSON.parse(data);

        for (i = 0; i < jsonDat.length; i++) {
            var venue = jsonDat[i].venue.name
            var region = jsonDat[i].venue.region
            var country = jsonDat[i].venue.country
            var city = jsonDat[i].venue.city

            console.log("Venue: " + venue)

            if (region === "") {
                console.log("Location: " + city + ", " + country)
            }
            else {
                console.log("Location: " + city + ", " + region)
            }
            console.log("Date: " + moment(jsonDat[i].datetime).format('L'));
            console.log("***********************************************************")
        };
    });
};

function searchOMDB() {
    var movie = word2;
    var queryUrl = "http://www.omdbapi.com/?apikey=trilogy&t=" + movie + "";

    if (queryUrl === "http://www.omdbapi.com/?apikey=trilogy&t=") {
        queryUrl = "http://www.omdbapi.com/?apikey=trilogy&t=Mr.+Nobody";
    }

    request(queryUrl, function (err, response, data) {
        if (err) {
            console.log('error:', err);
            console.log('statusCode:', response);
        }
        
        var jsonData = JSON.parse(data);
        console.log("***********************DATA********************************")
        console.log("Title: " + jsonData.Title);
        console.log("Year Released: " + jsonData.Year);
        console.log("IMDD Rating: " + jsonData.Ratings[0].Value);
        console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);
        console.log("Countries where the movie was produced: " + jsonData.Country);
        console.log("Language: " + jsonData.Language);
        console.log("Plot: " + jsonData.Plot);
        console.log("Actors: " + jsonData.Actors);

        fs.appendFile("log.txt", 
        "\n***********************DATA********************************" + 
        "\nCommand: " + word1 + 
        "\nSearch: " + movie + 
        "\nTitle: " + jsonData.Title + 
        "\nYear Released: " + jsonData.Year + 
        "\nIMDD Rating: " + jsonData.Ratings[0].Value + 
        "\nRotten Tomatoes Rating: " + jsonData.Ratings[1].Value + 
        "\nCountries where the movie was produced: " + jsonData.Country + 
        "\nLanguage: " + jsonData.Language + "\nPlot: " + jsonData.Plot + 
        "\nActors: " + jsonData.Actors + 
        "\n ", 
        function (err) {
            if (err) {
                return console.log(err);
            }
        });

    })
}

switch (word1) {
    case "do-what-it-says":
        fs.readFile("random.txt", "utf8", function (err, data) {
            if (err) {
                return console.log(err);
            }
            var dataArr = data.split(",");
            word1 = dataArr[0];
            word2 = dataArr[1].replace(/"/g, "");
            switchCase();
        })
        break;
}

switchCase();

