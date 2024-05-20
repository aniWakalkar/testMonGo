
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
require('dotenv').config();

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB connection URI
const mongoURI = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@${process.env.LOCAL_HOST}/sample_mflix`;

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));


// Define schema and model for the "users" collection
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model('User', UserSchema);

// JWT Secret
const JWT_SECRET = 'your_jwt_secret_key';

// JWT verification middleware

const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send({ message: 'No token provided!' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).send({ message: 'Failed to authenticate token.' });
        }
        req.userId = decoded.id;
        next();
    });
};



// Routes
app.get('/', (req, res) => {
    res.send('Hello, World!');
});


// Route to get all users
app.get('/users', verifyToken, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Signup route
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send({ message: 'Please fill all fields' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        name,
        email,
        password: hashedPassword
    });

    try {
        const newUser = await user.save();
        res.status(201).send({ message: 'User created successfully', userId: newUser._id });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});


// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ message: 'Please fill all fields' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).send({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});



// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});