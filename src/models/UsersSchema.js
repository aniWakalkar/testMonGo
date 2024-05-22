const mongoose = require('mongoose');

// schema and model for the "users" collection
const user_schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
      },
    password:  {
        type: String,
        required: true,
      }
});

const User = mongoose.model('User', user_schema);
module.exports = User;