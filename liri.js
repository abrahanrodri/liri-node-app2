require("dotenv").config();
var keys = require("./keys.js");
var spotify = require('node-spotify-api');
var axios = require('axios');
var moment = require('moment');
var dotevn = require('dotenv');
var fs = require('fs');

var spotify = new Spotify(keys.spotify);

var word1 = process.argv[2];
var word2 = process.argv[3];


switch(search) {
    case "concert-this":
      break;
    case "spotify-this-song":
      break;
    case "movie-this":     
      break;
    case "do-what-it-says":     
      break;
    default:
      text = "I have never heard of that fruit...";
  }
