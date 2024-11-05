// migrate-orders.js
const { Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const sourceClient = new Client({
    connectionString: process.env.SOURCE_DB_URL,
});

const destinationClient = new Client({
    connectionString: process.env.DESTINATION_DB_URL,
});

async function migrateOrders() {
    try {
        await sourceClient.connect();
        await destinationClient.connect();

        const res = await sourceClient.query('SELECT * FROM orders');
        const orders = res.rows;

        for (const order of orders) {
            await destinationClient.query(
                'INSERT INTO orders (id, user_id, product_id, quantity, order_date) VALUES ($1, $2, $3, $4, $5)',
                [order.id, order.user_id, order.product_id, order.quantity, order.order_date]
            );
        }

        console.log(`Successfully migrated ${orders.length} orders.`);
    } catch (error) {
        console.error('Error during migration:', error);
    } finally {
        await sourceClient.end();
        await destinationClient.end();
    }
}

migrateOrders();
