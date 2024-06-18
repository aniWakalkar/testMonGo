const express = require('express');
const router = express.Router();
const axios = require('axios');
const verifyToken = require('../middleware/Verify_token');
require('dotenv').config();


router.get('/search', verifyToken, async (req, res) => {
    try {
        const {search_query} = req.body;
        if (!search_query) {
            return res.status(400).send({ message: 'Please provide a search value' });
        }
        
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
        res.status(200).json(result);

    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router