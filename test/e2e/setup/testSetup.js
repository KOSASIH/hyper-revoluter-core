const mongoose = require('mongoose');
const { web3 } = require('../../../src/config/web3');
const config = require('../config');

const setupTestEnvironment = async () => {
    // Connect to the test database
    await mongoose.connect(config.testDatabaseUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    // Additional setup logic (e.g., deploying contracts, seeding data) can go here
};

const teardownTestEnvironment = async () => {
    // Clean up the database
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
};

module.exports = {
    setupTestEnvironment,
    teardownTestEnvironment,
};
