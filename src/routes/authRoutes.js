// src/routes/authRoutes.js

const express = require('express');
const AuthController = require('../controllers/authController');

const router = express.Router();

// User login
router.post('/login', AuthController.login);

// User logout
router.post('/logout', AuthController.logout);

module.exports = router;
