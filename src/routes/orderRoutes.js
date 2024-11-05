// src/routes/orderRoutes.js

const express = require('express');
const OrderController = require('../controllers/orderController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new order
router.post('/', authenticate, OrderController.createOrder);

// Get an order by ID
router.get('/:id', authenticate, OrderController.getOrder);

// Get all orders for a user
router.get('/user/:userId', authenticate, OrderController.getUserOrders);

module.exports = router;
