const express = require('express');

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