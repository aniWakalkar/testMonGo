const db_connection = require('./Config/Db_connection');
const User = require('./Models/Users');
db_connection()

const authRouter = require("./routes/auth")
const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// JWT verification middleware
const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send({ message: 'No token provided!' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).send({ message: 'Failed to authenticate token.' });
        }
        req.userId = decoded.id;
        next();
    });
};


// ------------------------------------------------------------
// Routes
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// ------------------------------------------------------------
// signup and login routes
app.use('/api', authRouter);

// ------------------------------------------------------------
// Route to get all users
app.get('/api/users', verifyToken, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});