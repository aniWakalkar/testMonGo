const mongoose = require('mongoose');


// Define the main movie schema
const movie_schema = new mongoose.Schema({
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
  year: { type: String, required: true },
  // bookmarked: { type: Boolean , default:false},
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

// Create and export the model
const Movie = mongoose.model('Movie', movie_schema);

module.exports = Movie;