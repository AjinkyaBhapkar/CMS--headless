const mongoose = require('mongoose');

// Define the Author schema
const authorSchema = new mongoose.Schema({
    bio: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }],
    socials: [{
        type: {
            type: String
        },
        link: {
            type: String
        }
    }]
}, {
    timestamps: true
});

// Create the Author model
const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
