const mongoose = require('mongoose');

// Define the LikesDislikes schema
const likesDislikesSchema = new mongoose.Schema({
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['like', 'dislike'],
        required: true
    }
}, {
    timestamps: true
});

// Create the LikesDislikes model
const LikesDislikes = mongoose.model('LikesDislikes', likesDislikesSchema);

module.exports = LikesDislikes;
