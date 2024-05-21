const mongoose = require('mongoose');

// schema and model for the "users" collection
const user_schema = new mongoose.Schema({
    email: String,
    password: String
});

const User = mongoose.model('User', user_schema);
module.exports = User;