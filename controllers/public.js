const User = require("../models/users");
const bcrypt = require("bcrypt");

// Define the signup controller
async function signup(req, res) {
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) return res.status(400).send("User already exists.");

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 13);
    let userName =
      req.body.firstName.toLowerCase() + req.body.lastName.toLowerCase();
    let uniqueUserName = false;

    for (let i = 0; i < 10; i++) {
      const existingUserName = await User.findOne({ userName });
      if (!existingUserName) {
        uniqueUserName = true;
        break;
      }
      userName =
        req.body.firstName.toLowerCase() +
        req.body.lastName.toLowerCase() +
        Math.random().toString(36).substring(2, 5);
    }

    if (!uniqueUserName) {
      throw new Error("Could not generate unique username after 10 attempts");
    }

    // Create a new user
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName,
      email: req.body.email,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();

    // Send a success response
    res.status(201).send("User registered successfully.");
  } catch (err) {
    res.status(500).send("Internal server error.");
  }
}

// Define the signin controller
async function signin(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password.");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send("Invalid email or password.");

    res.status(200).send({ message: "Logged in successfully" });
  } catch (err) {
    res.status(500).send("Internal server error.");
  }
}

module.exports = { signup, signin };
