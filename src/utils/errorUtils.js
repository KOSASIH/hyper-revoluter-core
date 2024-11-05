// src/utils/errorUtils.js

/**
 * Custom error class for handling application errors
 */
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true; // Operational errors are expected errors
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Handle operational errors
 * @param {String} message - The error message
 * @param {Number} statusCode - The HTTP status code
 * @returns {AppError} - The created AppError instance
 */
const createOperationalError = (message, statusCode) => {
    return new AppError(message, statusCode);
};

module.exports = {
    AppError,
    createOperationalError,
};
