// src/middleware/validationMiddleware.js

const Joi = require('joi');

const validateUser  = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    next();
};

const validateProduct = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        description: Joi.string().min(10).max(1000).required(),
        price: Joi.number().min(0).required(),
        stock: Joi.number().min(0).required(),
        category: Joi.string().valid('Electronics', 'Clothing', 'Home', 'Beauty', 'Sports').required(),
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    next();
};

module.exports = {
    validateUser ,
    validateProduct,
};
