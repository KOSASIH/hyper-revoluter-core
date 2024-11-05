const request = require('supertest');
const app = require('../../../src/app');
const { setupTestEnvironment, teardownTestEnvironment } = require('../setup/testSetup');

describe('User Flow E2E Tests', () => {
    let authToken;
    let userId;

    beforeAll(async () => {
        await setupTestEnvironment();
    });

    afterAll(async () => {
        await teardownTestEnvironment();
    });

    describe('Complete User Journey', () => {
        it('should complete registration process', async () => {
            const response = await request(app)
                .post('/api/auth/register')
                .send({
                    email: 'e2e@test.com',
                    password: 'TestPass123!',
                    username: 'e2euser'
                });

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('token');
            authToken = response.body.token;
            userId = response.body.userId;
        });

        it('should create a wallet for user', async () => {
            const response = await request(app)
                .post('/api/wallet/create')
                .set('Authorization', `Bearer ${authToken}`)
                .send();

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('address');
        });

        it('should perform token transaction', async () => {
            const response = await request(app)
                .post('/api/transactions/transfer')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    to: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
                    amount: '1.5'
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('transactionHash');
        });
    });
});
