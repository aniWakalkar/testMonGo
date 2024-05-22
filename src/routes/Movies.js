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
router.get('/get/all/movies', verifyToken, async (req, res) => {
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

// GET route to fetch MOVIE data FROM DATABASE
router.get('/get/movie', verifyToken, async (req, res) => {
    try {
        const {search_query} = req.body;
        if (!search_query) {
            return res.status(400).send({ message: 'Please provide a movie name' });
        }
        const savedMovie = await Movie.find({ name: new RegExp(search_query, 'i') }).limit(14);

        if (savedMovie.length === 0) {
            const options = {
                method: 'GET',
                url: process.env.SEARCH_URL,
                params: {
                  country: 'in',
                  title: search_query,
                  output_language: 'en'
                },
                headers: {
                  'X-RapidAPI-Key': process.env.SEARCH_X_RAPID_KEY,
                  'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
                }
            };
            const response = await axios.request(options);
            let result = response.data

            if (result.length === 0){
                return res.status(404).send({ message: 'Movie not found' });
            }else{
                return res.status(200).json(result);
            }
        }else{
            return res.status(200).json(savedMovie);
        }
        
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router