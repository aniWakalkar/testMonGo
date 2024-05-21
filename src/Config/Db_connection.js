const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection URI
// const mongoURI = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@${process.env.LOCAL_HOST}/entertainment_app`;
const mongoURI = `mongodb+srv://aniketwakalkar23:3LW8W9q7gZ1i3j13@moviesapp.zazbdfn.mongodb.net/entertainment_app`;

// Connect to MongoDB
const db_connection = async () => {
    try {
      await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB connected...');
    } catch (err) {
      console.error('MongoDB connection error:', err);
      process.exit(1); // Exit process with failure
    }
  };
  
  module.exports = db_connection;