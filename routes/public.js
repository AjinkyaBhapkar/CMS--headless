const express = require("express");
const router = express.Router();
const { signup, signin } = require("../controllers/public");
const Joi = require("joi");

// Define the signup route with inline validation
router.post("/signup", (req, res) => {
  // Define the validation schema
  const signupSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  const { error } = signupSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // Call the signup controller
  signup(req, res);
});

// Define the signin route with inline validation
router.post("/signin", (req, res) => {
  const signinSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const { error } = signinSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  signin(req, res);
});

module.exports = router;
