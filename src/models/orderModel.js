// src/models/orderModel.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User ',
        required: true,
    },
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
        min: 0,
    },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending',
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

// Method to calculate total amount
orderSchema.methods.calculateTotalAmount = function () {
    this.totalAmount = this.products.reduce((total, item) => {
        return total + item.quantity * item.product.price; // Assuming product price is accessible
   }, 0);
};

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
