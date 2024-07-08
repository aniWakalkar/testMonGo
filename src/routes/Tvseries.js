const express = require('express');
const router = express.Router();
const axios = require('axios');
const Tv_series = require('../models/Tv_seriesSchema');
const User = require('../models/UsersSchema')
const Bookmarked_TVSeries = require('../models/BookMarkedSeries');
const verifyToken = require('../middleware/Verify_token');
require('dotenv').config();


// POST route to fetch and save TV series data
router.post('/admin/set/tvseries', verifyToken, async (req, res) => {
    try {
        const options = {
            method: "GET",
            url: process.env.SERIES_URL,
            // params: { countryId: "in" },
            headers: {
                "X-RapidAPI-Key": process.env.X_RAPID_KEY,
                "X-RapidAPI-Host": process.env.X_RAPID_HOST,
            },
            timeout: 30000
        };
        const response = await axios.request(options); 
        const tvSeriesData = response.data;
  
        // Create an array of promises for saving each TV series
        const savePromises = tvSeriesData.map(seriesData => {
            const series = new Tv_series({
            big_image: seriesData.big_image,
            description: seriesData.description,
            genre: seriesData.genre,
            id: seriesData.id,
            image: seriesData.image,
            imdb_link: seriesData.imdb_link,
            imdbid: seriesData.imdbid,
            rank: seriesData.rank,
            rating: seriesData.rating,
            thumbnail: seriesData.thumbnail,
            title: seriesData.title,
            year: seriesData.year
            });
            return series.save();
      });
  
      const savedSeries = await Promise.all(savePromises);
      res.status(201).json(savedSeries);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET route to fetch TV_SERIES data FROM DATABASE
router.get('/get/all/tvseries', verifyToken, async (req, res) => {
    try {
        const savedTv_series = await Tv_series.find();
        const userId = req.userId;
  
        if (!savedTv_series) {
          return res.status(404).send({ message: 'tvSeries not found' });
        }
  
        res.status(200).json({"series" : savedTv_series, "id" : userId});
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
  
// GET route to fetch TV_SERIES data FROM DATABASE
router.get('/get/tvseries', verifyToken, async (req, res) => {
    try {
        const {search_query} = req.body;
        if (!search_query) {
            return res.status(400).send({ message: 'Please provide a movie name' });
        }
        const savedTv_series = await Tv_series.find({ title: new RegExp(search_query, 'i') }).limit(14);

        if (savedTv_series.length === 0){
            return res.status(404).send({ message: 'Series not found' });
        }
        return res.status(200).json(savedTv_series);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/bookmark/set/tvseries', verifyToken, async (req, res) => {
    try {
        const { id } = req.body;
        const userId = req.userId; // Use req.userId instead of req.user.id

        if (!userId) {
            return res.status(401).json({ error: 'User ID not found in token' });
        }

        // Update User document to add the bookmark
        await User.findByIdAndUpdate(userId, { $addToSet: { bookmarks: id } });

        // Update TV Series document to add the user's bookmark
        const updatedSeries = await Tv_series.findByIdAndUpdate(
            id,
            { $addToSet: { bookmarks: userId } },
            { new: true }
        );

        if (!updatedSeries) {
            return res.status(404).json({ message: 'TV series not found' });
        }

        res.status(200).json(updatedSeries);
    } catch (error) {
        console.error('Error bookmarking TV series:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

router.get('/bookmark/get/tvseries', verifyToken, async (req, res) => {
    try {
        const userId = req.userId; // Assuming verifyToken middleware sets req.userId

        // Find TV series that have been bookmarked by the user
        const bookmarkedTVSeries = await Tv_series.find({ bookmarks: userId });

        res.status(200).json(bookmarkedTVSeries);
    } catch (error) {
        console.error('Error fetching bookmarked TV series:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/bookmark/delete/tvseries/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId; // Assuming verifyToken middleware sets req.userId

        // Update User document to remove the bookmark
        await User.findByIdAndUpdate(userId, { $pull: { bookmarks: id } });

        // Update TV Series document to remove the user's bookmark
        const updatedSeries = await Tv_series.findByIdAndUpdate(
            id,
            { $pull: { bookmarks: userId } },
            { new: true }
        );

        if (!updatedSeries) {
            return res.status(404).json({ message: 'TV series not found' });
        }

        res.status(200).json({"message" : "Removed from bookmark successfully", "id" : id});
    } catch (error) {
        console.error('Error deleting bookmark for TV series:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router