// src/routes/userRoutes.js

const express = require('express');
const UserController = require('../controllers/userController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new user
router.post('/', UserController.createUser );

// Get a user by ID
router.get('/:id', authenticate, UserController.getUser );

// Update a user by ID
router.put('/:id', authenticate, UserController.updateUser );

// Delete a user by ID
router.delete('/:id', authenticate, UserController.deleteUser );

module.exports = router;
