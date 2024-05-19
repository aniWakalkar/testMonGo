const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB connection URI
const mongoURI = 'mongodb+srv://aniketwakalkar23:3LW8W9q7gZ1i3j13@moviesapp.zazbdfn.mongodb.net/sample_mflix';

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

// Routes
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// // Route to get all items
// app.get('/items', async (req, res) => {
//     try {
//         const items = await Item.find();
//         res.json(items);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Route to create a new item
// app.post('/items', async (req, res) => {
//     const item = new Item({
//         name: req.body.name,
//         quantity: req.body.quantity
//     });

//     try {
//         const newItem = await item.save();
//         res.status(201).json(newItem);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// Route to get all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
