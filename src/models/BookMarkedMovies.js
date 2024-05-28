const mongoose = require('mongoose');

// Define the main movie schema
const bookmarked_movie_schema = new mongoose.Schema({
  big_image: { type: String, required: true },
  description: { type: String, required: true },
  genre: { type: [String], required: true },
  id: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  imdb_link: { type: String, required: true },
  imdbid: { type: String, required: true, unique: true },
  rank: { type: Number, required: true },
  rating: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  title: { type: String, required: true },
  year: { type: String, required: true }
});

// Create and export the model
const Bookmarked_Movie = mongoose.model('Bookmarked_Movie', bookmarked_movie_schema);

module.exports = Bookmarked_Movie;