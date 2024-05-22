const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UsersSchema');
require('dotenv').config();



// Signup route
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ message: 'Please fill all fields' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        email,
        password: hashedPassword
    });
    try {
        const newUser = await user.save();
        res.status(201).send({ message: 'User created successfully', userId: newUser._id });
    } catch (err) {
        if(err.message.includes('duplicate')){
            return res.status(400).send({ message: "User already exist" });
        }
        res.status(400).send({ message: err.message });
    }
});

// Login route
router.post('/login', async (req, res) => {
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

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });

        res.status(200).send({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

module.exports = router