// src/utils/dateUtils.js

const moment = require('moment');

/**
 * Format a date to a specific format
 * @param {Date|String} date - The date to format
 * @param {String} format - The format string (default: 'YYYY-MM-DD')
 * @returns {String} - The formatted date
 */
const formatDate = (date, format = 'YYYY-MM-DD') => {
    return moment(date).format(format);
};

/**
 * Get the current date and time
 * @returns {String} - The current date and time in ISO format
 */
const getCurrentDateTime = () => {
    return moment().toISOString();
};

module.exports = {
    formatDate,
    getCurrentDateTime,
};
