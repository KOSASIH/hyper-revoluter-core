// migrate-users.js
const { Client } = require('pg'); // PostgreSQL client
const dotenv = require('dotenv');

dotenv.config();

const sourceClient = new Client({
    connectionString: process.env.SOURCE_DB_URL,
});

const destinationClient = new Client({
    connectionString: process.env.DESTINATION_DB_URL,
});

async function migrateUsers() {
    try {
        await sourceClient.connect();
        await destinationClient.connect();

        const res = await sourceClient.query('SELECT * FROM users');
        const users = res.rows;

        for (const user of users) {
            await destinationClient.query(
                'INSERT INTO users (id, name, email, role, created_at) VALUES ($1, $2, $3, $4, $5)',
                [user.id, user.name, user.email, user.role, user.created_at]
            );
        }

        console.log(`Successfully migrated ${users.length} users.`);
    } catch (error) {
        console.error('Error during migration:', error);
    } finally {
        await sourceClient.end();
        await destinationClient.end();
    }
}

migrateUsers();
