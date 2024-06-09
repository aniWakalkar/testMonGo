const db_connection = require('./config/Db_connect');
db_connection()

const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const authRouter = require("./routes/Authentication")
const usersRouter = require("./routes/Users")
const moviesRouter = require("./routes/Movies")
const Tv_seriesRouter = require("./routes/Tvseries")
const searchRouter = require("./routes/Search")


// Middleware to parse JSON bodies
app.use(cors());
app.use(express.json());


// testing
app.get('/', (req, res) => {
    res.send('Hello, World!');
});


app.use('/api', authRouter);
app.use('/api', usersRouter);
app.use('/api', moviesRouter);
app.use('/api', Tv_seriesRouter);
app.use('/api', searchRouter);



const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}/`);
});