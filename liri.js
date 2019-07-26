require("dotenv").config();
var keys = require("./keys.js");
var spotify = require('node-spotify-api');
var axios = require('axios');
var moment = require('moment');
var dotevn = require('dotenv');
var fs = require('fs');

var spotify = new Spotify(keys.spotify);

var word1 = process.argv[2];
var word2 = process.argv.slice(3).join(" ");



switch(word1) {
    case "concert-this":
        searchBands();
      break;
    case "spotify-this-song":
        searchSpotify();
      break;
    case "movie-this":  
        searchOMDB();  
      break;
    case "do-what-it-says": 
        logDo();
      break;
    default:
      console.log("I have never heard of that...");
  }


  function searchBands(){
    if (word2 === undefined) {
        word2 = "drake";
        searchBands(word2);
    } else{
        artistName = word2;
        searchBands(word2);
    }

 var artistName = word2;
 var queryUrl = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";

 axios.get(queryUrl)
 .then(function(response) {

     var jsonData = response.data;
             console.log("Venue: " + jsonData[i].venue.name);
             console.log("Location: " + jsonData[i].venue.country + jsonData[i].venue.city);
             console.log("Date: " + moment(jsonData[i].venue.datetime).format('MM/DD/YYYY'));
         }
        
 )}

  function searchSpotify(){

  }

  function searchOMDB(){
    if (word2 === undefined) {
        word2 = "the+avengers";
        searchOMDB(word2);
    } else{
        movie = word2;
        searchOMDB(word2);
    } 
    
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece")
    .then(function (response) {
        var jsonData = response.data;
            console.log("Title of the movie: " + jsonData.title);
            console.log("Year the movie came out: " + jsonData.Year);
            console.log("IMDB Rating of the movie: " + jsonData.imdbRating);
            console.log("Rotten Tomatoes Rating of the movie: " + jsonData.ratings);
            console.log("Country where the movie was produced: " + jsonData.Country);
            console.log(" Language of the movie: " + jsonData.Language);
            console.log("Plot of the movie: " + jsonData.Plot);
            console.log("Actors in the movie: " + jsonData.Actors);
        }
    )
  }

  function logDo(){
    fs.readFile('random.txt', 'Hello content!', function (err) {
        if (err) throw err;
        console.log('Saved!');
      })
    }