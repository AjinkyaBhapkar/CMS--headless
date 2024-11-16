const Project = require('../models/projects');

// Define the createProject controller
async function createProject(req, res) {
    try {
        // Clean the project name
        const cleanedName = req.body.name
            .replace(/[^a-zA-Z0-9]/g, '') // Remove non-alphanumeric
            .replace(/\s+/g, '')          // Remove whitespace
            .toLowerCase();               // Convert to lowercase

        // Check if project with same name already exists
        const existingProject = await Project.findOne({ name: cleanedName });
        if (existingProject) {
            return res.status(409).send('Project with this name already exists.');
        }

        // Create a new project
        const project = new Project({
            name: cleanedName,
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
