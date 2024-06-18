const express = require('express');
const router = express.Router();
const axios = require('axios');
const Movie = require('../models/MoviesSchema');
const User = require('../models/UsersSchema')
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
        const userId = req.userId;
        if (!savedMovies) {
          return res.status(404).send({ message: 'Movies not found' });
        }
  
        res.status(200).json({"movies" : savedMovies, "id" : userId});
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
        const { id } = req.body;
        const userId = req.userId; // Use req.userId instead of req.user.id

        if (!userId) {
            return res.status(401).json({ error: 'User ID not found in token' });
        }

        // Update User document to add the bookmark
        await User.findByIdAndUpdate(userId, { $addToSet: { bookmarks: id } });

        // Update Movie document to add the user's bookmark
        const updatedMovie = await Movie.findByIdAndUpdate(
            id,
            { $addToSet: { bookmarks: userId } },
            { new: true }
        );

        if (!updatedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.status(200).json(updatedMovie);
    } catch (error) {
        console.error('Error bookmarking movie:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

router.get('/bookmark/get/movies', verifyToken, async (req, res) => {
    try {
        const userId = req.userId; // Assuming verifyToken middleware sets req.user

        // Find movies that have been bookmarked by the user
        const bookmarkedMovies = await Movie.find({ bookmarks: userId });

        res.status(200).json(bookmarkedMovies);
    } catch (error) {
        console.error('Error fetching bookmarked movies:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/bookmark/delete/movie/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId; // Assuming verifyToken middleware sets req.user

        // Update User document to remove the bookmark
        await User.findByIdAndUpdate(userId, { $pull: { bookmarks: id } });

        // Update Movie document to remove the user's bookmark
        const updatedMovie = await Movie.findByIdAndUpdate(
            id,
            { $pull: { bookmarks: userId } },
            { new: true }
        );

        if (!updatedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.status(200).json(updatedMovie);
    } catch (error) {
        console.error('Error deleting bookmark:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router