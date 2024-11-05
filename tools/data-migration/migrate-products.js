// migrate-products.js
const { Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const sourceClient = new Client({
    connectionString: process.env.SOURCE_DB_URL,
});

const destinationClient = new Client({
    connectionString: process.env.DESTINATION_DB_URL,
});

async function migrateProducts() {
    try {
        await sourceClient.connect();
        await destinationClient.connect();

        const res = await sourceClient.query('SELECT * FROM products');
        const products = res.rows;

        for (const product of products) {
            await destinationClient.query(
                'INSERT INTO products (id, name, description, price, in_stock) VALUES ($1, $2, $3, $4, $5)',
                [product.id, product.name, product.description, product.price, product.in_stock]
            );
        }

        console.log(`Successfully migrated ${products.length} products.`);
    } catch (error) {
        console.error('Error during migration:', error);
    } finally {
        await sourceClient.end();
        await destinationClient.end();
    }
}

migrateProducts();
