// src/utils/responseUtils.js

/**
 * Send a success response
 * @param {Object} res - The response object
 * @param {Object} data - The data to send in the response
 * @param {String} message - Optional success message
 */
const sendSuccessResponse = (res, data, message = 'Success') => {
    res.status(200).json({
        status: 'success',
        message,
        data,
    });
};

/**
 * Send an error response
 * @param {Object} res - The response object
 * @param {Number} statusCode - The HTTP status code
 * @param {String} message - The error message
 */
const sendErrorResponse = (res, statusCode, message) => {
    res.status(statusCode).json({
        status: 'error',
        message,
    });
};

module.exports = {
    sendSuccessResponse,
    sendErrorResponse,
};
