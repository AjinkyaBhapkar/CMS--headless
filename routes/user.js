const express = require('express');
const router = express.Router();
const { createProject } = require('../controllers/user');
const Joi = require('joi');

// Define the create project route with inline validation
router.post('/create-project', (req, res) => {
    // Define the validation schema
    const projectSchema = Joi.object({
        name: Joi.string().required(),
        admin: Joi.string().required(), // Assuming admin is a user ID
        authors: Joi.array().items(Joi.string()), // Assuming authors are user IDs
        apiKeys: Joi.array().items(Joi.object({
            key: Joi.string().required(),
            expiresAt: Joi.date().optional(),
            status: Joi.string().valid('active', 'revoked').optional()
        })).optional()
    });

    const { error } = projectSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    // Call the createProject controller
    createProject(req, res);
});

module.exports = router;
