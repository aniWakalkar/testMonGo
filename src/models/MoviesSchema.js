const mongoose = require('mongoose');


// Define the main movie schema
const movie_schema = new mongoose.Schema({
  rank: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  big_image: { type: String, required: true },
  genre: { type: [String], required: true },
  thumbnail: { type: String, required: true },
  rating: { type: String, required: true },
  id: { type: String, required: true },
  year: { type: Number, required: true },
  imdbid: { type: String, required: true },
  imdb_link: { type: String, required: true }
});

// Create and export the model
const Movie = mongoose.model('Movie', movie_schema);

module.exports = Movie;