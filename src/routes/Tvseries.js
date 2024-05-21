const express = require('express');
const router = express.Router();
const axios = require('axios');
const Tv_series = require('../models/Tv_seriesSchema');
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
                "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
            },
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
  
      // Wait for all promises to resolve
      const savedSeries = await Promise.all(savePromises);
      res.status(201).json(savedSeries);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET route to fetch TV_SERIES data FROM DATABASE
router.get('/get/tvseries', verifyToken, async (req, res) => {
    try {
        const savedTv_series = await Tv_series.find();
  
        if (!savedTv_series) {
          return res.status(404).send({ message: 'Tv_series not found' });
        }
  
        res.status(200).json(savedTv_series);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
  
// GET route to fetch TV_SERIES DETAILS data FROM DATABASE
router.get('/get/tvseries/details', verifyToken, async (req, res) => {
try {
    const {search_query} = req.body;
    if (!search_query) {
        return res.status(400).send({ message: 'Please provide a movie name' });
    }
    const savedTv_series = await Tv_series.find({ title: new RegExp(search_query, 'i') }).limit(14);

    if (!savedTv_series) {
        return res.status(404).send({ message: 'Tv_series not found' });
    }

    res.status(200).json(savedTv_series);
} catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
});


module.exports = router