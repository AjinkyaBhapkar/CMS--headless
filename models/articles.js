const mongoose = require('mongoose');

// Define the Metatags schema
const metatagsSchema = new mongoose.Schema({
    title: String,
    description: String,
    keywords: [String]
});

// Define the Article schema
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    excerpt: {
        type: String
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    },
    content: {
        type: String, // Assuming HTML content is stored as a string
        required: true
    },
    metatags: metatagsSchema,
    isPublished: {
        type: Boolean,
        default: false
    },
    publishedAt: {
        type: Date
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    readTime: {
        type: Number // Read time in minutes
    }
}, {
    timestamps: true
});

// Create the Article model
const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
