const express = require('express');
const router = express.Router();
const axios = require('axios');
const Movie = require('../models/MoviesSchema');
const verifyToken = require('../middleware/Verify_token');
require('dotenv').config();


// POST route to fetch and save data
router.post('/admin/set/movies', verifyToken, async (req, res) => {
    try {
        const options = {
        method: "GET",
        url: process.env.MOVIES_URL,
        params: { countryId: "in" },
        headers: {
            "X-RapidAPI-Key": process.env.X_RAPID_KEY,
            "X-RapidAPI-Host": "flixster.p.rapidapi.com",
        },
        };
        const response = await axios.request(options);
        const moviesData = response.data.data.opening;
        // console.log(moviesData, "+++++++++++++++++")
        console.log("Data fetched successfully")
        // Create an array of promises for saving each movie
        const savePromises = moviesData.map(movieData => {
        const movie = new Movie({
          emsId: movieData.emsId,
          emsVersionId: movieData.emsVersionId,
          name: movieData.name,
          posterImage: movieData.posterImage,
          height: movieData.height,
          type: movieData.type,
          url: movieData.url,
          width: movieData.width,
          sortEms: movieData.sortEms,
          tomatoRating: movieData.tomatoRating,
          iconImage: movieData.iconImage
        });
        return movie.save();
        });
  
        const savedMovies = await Promise.all(savePromises);
        res.status(201).json(savedMovies);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET route to fetch MOVIE data FROM DATABASE
router.get('/get/movies', verifyToken, async (req, res) => {
    try {
        const savedMovies = await Movie.find();
  
        if (!savedMovies) {
          return res.status(404).send({ message: 'Movies not found' });
        }
  
        res.status(200).json(savedMovies);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET route to fetch MOVIE DETAILS data FROM DATABASE
router.get('/get/movie/details', verifyToken, async (req, res) => {
try {
    const {search_query} = req.body;
    if (!search_query) {
        return res.status(400).send({ message: 'Please provide a movie name' });
    }
    const savedMovie = await Movie.find({ name: new RegExp(search_query, 'i') }).limit(14);

    if (!savedMovie) {
        return res.status(404).send({ message: 'Movie not found' });
    }

    res.status(200).json(savedMovie);
} catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
});



module.exports = router