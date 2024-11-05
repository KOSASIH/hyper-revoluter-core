// src/models/productModel.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100,
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 1000,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: String,
        required: true,
        enum: ['Electronics', 'Clothing', 'Home', 'Beauty', 'Sports'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Method to update stock
productSchema.methods.updateStock = async function (quantity) {
    this.stock -= quantity;
    await this.save();
};

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
