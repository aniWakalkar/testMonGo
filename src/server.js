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

const express = require('express');
const app = express();
require('dotenv').config();
const authRouter = require("./routes/Authentication")
const usersRouter = require("./routes/Users")
const moviesRouter = require("./routes/Movies")
const Tv_seriesRouter = require("./routes/Tvseries")


// Middleware to parse JSON bodies
app.use(express.json());


// testing
app.get('/', (req, res) => {
    res.send('Hello, World!');
});


app.use('/api', authRouter);
app.use('/api', usersRouter);
app.use('/api', moviesRouter);
app.use('/api', Tv_seriesRouter);



const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});