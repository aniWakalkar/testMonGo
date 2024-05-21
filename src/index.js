const express = require('express');
const authRouter = require("./routes/Authentication")
const usersRouter = require("./routes/Users")
const moviesRouter = require("./routes/Movies")
const Tv_seriesRouter = require("./routes/Tvseries")
const router = express.Router();

// ------------------------------------------------------------
// signup and login routes
router.use('/auth', authRouter);

// ------------------------------------------------------------
// users routes
router.use('/get', usersRouter);

// ------------------------------------------------------------
// movies routes
router.use('/user', moviesRouter);

// ------------------------------------------------------------
// tv_series routes
router.use('/user', Tv_seriesRouter);


module.exports = router;