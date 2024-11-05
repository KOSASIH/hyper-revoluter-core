// src/routes/productRoutes.js

const express = require('express');
const ProductController = require('../controllers/productController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new product
router.post('/', authenticate, ProductController.createProduct);

// Get a product by ID
router.get('/:id', ProductController.getProduct);

// Update a product by ID
router.put('/:id', authenticate, ProductController.updateProduct);

// Delete a product by ID
router.delete('/:id', authenticate, ProductController.deleteProduct);

module.exports = router;
