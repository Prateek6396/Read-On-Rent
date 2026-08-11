// tests/health.test.js
const request = require('supertest');

// Point to a local/in-memory-style DB for tests; adjust MONGODB_URI via env
// before running if you want to test against a real test database.
process.env.NODE_ENV = 'test';

const app = require('../server');

describe('Health check', () => {
  it('GET /health returns 200 and status message', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('Server is running');
  });

  it('GET /unknown-route returns 404', async () => {
    const res = await request(app).get('/unknown-route');
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });
});
