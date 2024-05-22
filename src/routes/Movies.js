const express = require('express');
const router = express.Router();
const axios = require('axios');
const Movie = require('../models/MoviesSchema');
const Bookmarked_Movie = require('../models/BookMarkedMovies');
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
                "X-RapidAPI-Host": process.env.X_RAPID_HOST,
            },
            timeout: 30000
        };
        const response = await axios.request(options);
        const moviesData = response.data;
        
        const savePromises = moviesData.map(movieData => {
            const movie = new Movie({
                big_image: movieData.big_image,
                description: movieData.description,
                genre: movieData.genre,
                id: movieData.id,
                image: movieData.image,
                imdb_link: movieData.imdb_link,
                imdbid: movieData.imdbid,
                rank: movieData.rank,
                rating: movieData.rating,
                thumbnail: movieData.thumbnail,
                title: movieData.title,
                year: movieData.year
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

        if (savedMovie.length === 0){
            return res.status(404).send({ message: 'Movie not found' });
        }
        return res.status(200).json(savedMovie);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/bookmark/set/movie', verifyToken, async (req, res) => {
    try {
        const {search_query} = req.body;

        const movie = {
            emsId: search_query.emsId,
            emsVersionId: search_query.emsVersionId,
            name: search_query.name,
            posterImage: search_query.posterImage,
            height: search_query.height,
            type: search_query.type,
            url: search_query.url,
            width: search_query.width,
            sortEms: search_query.sortEms,
            tomatoRating: search_query.tomatoRating,
            iconImage: search_query.iconImage
          };

        const BookMarkedMovies = await Bookmarked_Movie.create(movie);
        res.status(201).json(BookMarkedMovies);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/bookmark/get/movies', verifyToken, async (req, res) => {
    try {
        const bookmarked_Movies = await Bookmarked_Movie.find();
        if (!bookmarked_Movies) {
          return res.status(404).send({ message: 'Movies not found' });
        }
  
        res.status(200).json(bookmarked_Movies);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/bookmark/delete/movie', verifyToken, async (req, res) => {
    try {
        const {search_query} = req.body;
        if (!search_query) {
            return res.status(400).send({ message: 'Please provide a movie name' });
        }

        await Bookmarked_Movie.deleteOne({ _id: search_query._id })

        return res.status(200).json({ message: 'Removed from bookmark successfully', _id : search_query._id});
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router