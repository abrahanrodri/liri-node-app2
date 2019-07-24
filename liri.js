require("dotenv").config();
var keys = require("./keys.js");
var spotify1 = require('node-spotify-api');
var axios = require('axios');
var moment = require('moment');
var dotevn = require('dotenv');
var fs = require('fs');

var spotify2 = new Spotify(keys.spotify);

var word1 = process.argv[2];
var word2 = process.argv[3];