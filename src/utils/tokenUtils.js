// src/utils/tokenUtils.js

const jwt = require('jsonwebtoken');

/**
 * Generate a JWT token
 * @param {Object} payload - The payload to encode in the token
 * @param {String} secret - The secret key to sign the token
 * @param {Number} expiresIn - The expiration time in seconds
 * @returns {String} - The generated token
 */
const generateToken = (payload, secret, expiresIn = '1h') => {
    return jwt.sign(payload, secret, { expiresIn });
};

/**
 * Verify a JWT token
 * @param {String} token - The token to verify
 * @param {String} secret - The secret key to verify the token
 * @returns {Object} - The decoded payload if valid, otherwise throws an error
 */
const verifyToken = (token, secret) => {
    return jwt.verify(token, secret);
};

module.exports = {
    generateToken,
    verifyToken,
};
