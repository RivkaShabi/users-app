const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

// Import user controller functions for user CRUD and fetch
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

// User routes with authentication middleware
// Each route logs its initialization and is protected by JWT authentication
router.post('/getUsers', authenticateToken, getUsers); // Fetch users (local & external)
router.get('/getUser/:id', authenticateToken, getUserById); // Fetch user by ID
router.post('/createUser', authenticateToken, createUser); // Create new user
router.put('/updateUser/:id', authenticateToken, updateUser); // Update user
router.delete('/deleteUser/:id', authenticateToken, deleteUser); // Delete user

module.exports = router;
