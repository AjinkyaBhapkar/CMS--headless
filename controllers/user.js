const Project = require('../models/projects');

// Define the createProject controller
async function createProject(req, res) {
    try {
        // Create a new project
        const project = new Project({
            name: req.body.name,
            admin: req.body.admin,
            authors: req.body.authors,
            apiKeys: req.body.apiKeys
        });

        // Save the project to the database
        await project.save();

        // Send a success response
        res.status(201).send('Project created successfully.');
    } catch (err) {
        res.status(500).send('Internal server error.');
    }
}

module.exports = { createProject };
