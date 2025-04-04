import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';  // Import the User model
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Register route (admin registration)
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Check if the username already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) return res.status(400).send('Username already exists.');

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = new User({ username, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).send('User registered successfully');
  } catch (err) {
    res.status(500).send('Error registering user');
  }
});

// Login route (admin login)
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Check if the user exists
  const user = await User.findOne({ username });
  if (!user) return res.status(400).send('Invalid username or password');

  // Compare the entered password with the hashed password in DB
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) return res.status(400).send('Invalid username or password');

  // Generate JWT Token
  const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Send token back to client
  res.json({ token });
});

export default router;
