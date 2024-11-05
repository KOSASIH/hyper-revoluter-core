// src/routes/index.js

const express = require('express');
const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');
const productRoutes = require('./productRoutes');
const orderRoutes = require('./orderRoutes');

const router = express.Router();

// API root
router.get('/', (req, res) => {
    res.send('Welcome to the API');
});

// User routes
router.use('/users', userRoutes);

// Authentication routes
router.use('/auth', authRoutes);

// Product routes
router.use('/products', productRoutes);

// Order routes
router.use('/orders', orderRoutes);

module.exports = router;
