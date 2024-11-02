const mongoose = require('mongoose');

// Define the Project schema
const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    authors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    apiKeys: [{
        key: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        lastUsedAt: {
            type: Date
        },
        expiresAt: {
            type: Date
        },
        status: {
            type: String,
            enum: ['active', 'revoked'],
            default: 'active'
        }
    }]
},{
    timestamps: true
});

// Create the Project model
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
