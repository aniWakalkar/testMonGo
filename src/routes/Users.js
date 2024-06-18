const express = require('express');
const router = express.Router();
const User = require('../models/UsersSchema');
const authenticateUser = require('../middleware/Auth');
const verifyToken = require('../middleware/Verify_token');
require('dotenv').config();


router.get('/users', verifyToken, async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/userid', authenticateUser, async (req, res) => {
    try {
      const user = await User.findById(req.userId); // Uses the userId set by the middleware
  
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(401).json({ message: 'User not found' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router