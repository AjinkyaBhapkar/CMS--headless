const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        type: String
    }],
    profilePic: {
        type: String // Assuming this is a URL stored as a string
    }
}, {
    timestamps: true
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
