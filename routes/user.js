const express = require('express');
const router = express.Router();
const { createProject } = require('../controllers/user');
const Joi = require('joi');

// Define the create project route with inline validation
router.post('/create-project', (req, res) => {
    try {
        // Define the validation schema
        const projectSchema = Joi.object({
            name: Joi.string().required(),
        });

        const { error } = projectSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        // Call the createProject controller
        createProject(req, res);
    } catch (err) {
        res.status(500).send('user/create-project: Internal server error.');
    }
});

module.exports = router;
