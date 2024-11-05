const request = require('supertest');
const app = require('../../../src/app');
const { setupDatabase, cleanupDatabase } = require('../setup/db');
const User = require('../../../src/models/User');

describe('Authentication Integration Tests', () => {
    beforeAll(async () => {
        await setupDatabase();
    });

    afterAll(async () => {
        await cleanupDatabase();
    });

    describe('POST /api/auth/register', () => {
        it('should register a new user successfully', async () => {
            const response = await request(app)
                .post('/api/auth/register')
                .send({
                    email: 'test@example.com',
                    password: 'Password123!',
                    username: 'testuser'
                });

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('token');
            
            const user = await User.findOne({ email: 'test@example.com' });
            expect(user).toBeTruthy();
        });
    });

    describe('POST /api/auth/login', () => {
        it('should login existing user successfully', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'Password123!'
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
        });
    });
});
