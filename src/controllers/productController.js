// src/controllers/productController.js

const ProductService = require('../services/productService');
const { validateProduct, validateProductUpdate } = require('../utils/validators');

class ProductController {
    async createProduct(req, res) {
        try {
            const { error } = validateProduct(req.body);
            if (error) return res.status(400).json({ message: error.details[0].message });

            const product = await ProductService.createProduct(req.body);
            return res.status(201).json(product);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async getProduct(req, res) {
        try {
            const product = await ProductService.getProductById(req.params.id);
            if (!product) return res.status(404).json({ message: 'Product not found' });
            return res.status(200).json(product);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async updateProduct(req, res) {
        try {
            const { error } = validateProductUpdate(req.body);
            if (error) return res.status(400).json({ message: error.details[0].message });

            const updatedProduct = await ProductService.updateProduct(req.params.id, req.body);
            if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
            return res.status(200).json(updatedProduct);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async deleteProduct(req, res) {
        try {
            const deletedProduct = await ProductService.deleteProduct(req.params.id);
            if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
            return res.status(204).send();
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

module.exports = new ProductController();
