const express = require('express');
const bcrypt = require('bcryptjs');
const { UserSystem } = require('../models/userSystemModel');
const { generateToken } = require('../utils/jwt');

const router = express.Router();

// Register a new user in the system
router.post('/register', async (req, res, next) => {
  try {
    const { firstName, lastName, username, email, phone, password } = req.body;

    // Check if username already exists
    const existing = await UserSystem.findOne({ username });
    if (existing) {
      const err = new Error('Username already exists');
      err.status = 400;
      console.warn('[userSystemRoutes] Registration failed: username exists');
      return next(err);
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserSystem = new UserSystem({
      firstName,
      lastName,
      username,
      email,
      phone,
      password: hashedPassword,
    });

    await newUserSystem.save();

    console.log('[userSystemRoutes] User registered:', username);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('[userSystemRoutes] Registration error:', error);
    next(error);
  }
});

// Login user and return JWT token
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const userSystem = await UserSystem.findOne({ username });
    if (!userSystem) {
      const err = new Error('Username not found');
      err.status = 401;
      console.warn('[userSystemRoutes] Login failed: username not found');
      return next(err);
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, userSystem.password);
    if (!isMatch) {
      const err = new Error('Password not found');
      err.status = 401;
      console.warn('[userSystemRoutes] Login failed: password mismatch');
      return next(err);
    }

    // Generate JWT token
    const token = generateToken(userSystem._id.toString());

    console.log('[userSystemRoutes] User logged in:', username);
    res.json({ token });
  } catch (error) {
    console.error('[userSystemRoutes] Login error:', error);
    next(error);
  }
});

module.exports = router;
