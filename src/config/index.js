// src/config/index.js

const fs = require('fs');
const path = require('path');

// Load environment-specific configuration
const env = process.env.NODE_ENV || 'development';
const configPath = path.join(__dirname, `${env}.json`);

if (!fs.existsSync(configPath)) {
    throw new Error(`Configuration file for environment "${env}" not found.`);
}

const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

// Export the configuration
module.exports = {
    ...config,
    env,
};
