const mongoose = require('mongoose');

// Define the Tag schema
const tagSchema = new mongoose.Schema({
    tagValue: {
        type: String,
        required: true,
        unique: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Create the Tag model
const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
