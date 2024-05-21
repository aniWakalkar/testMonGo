const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection URI
const mongoURI = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@${process.env.LOCAL_HOST}/entertainment_app`;

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

db_connection()

const routes = require('./index');
const express = require('express');
const app = express();
require('dotenv').config();



// Middleware to parse JSON bodies
app.use(express.json());

app.use('/', routes);



const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});