const mongoose = require('mongoose');

// Define the schema for the poster image and icon image
const imageSchema = new mongoose.Schema({
  url: { type: String}
});

// Define the schema for the ratings
const ratingSchema = new mongoose.Schema({
  tomatometer: { type: Number},
  dtlLikedScore: { type: Number},
  dtlScoreCount: { type: Number},
  dtlWtsCount: { type: Number },
  dtlWtsScore: { type: Number }
});

// Define the main movie schema
const movie_schema = new mongoose.Schema({
  emsId: { type: String, required : true},
  emsVersionId: { type: String},
  name: { type: String},
  posterImage: { type: imageSchema},
  height: { type: Number },
  type: { type: String },
  url: { type: String},
  width: { type: Number },
  sortEms: { type: String },
  tomatoRating: { type: ratingSchema},
  iconImage: { type: imageSchema}
});

// Create and export the model
const Movie = mongoose.model('Movie', movie_schema);

module.exports = Movie;