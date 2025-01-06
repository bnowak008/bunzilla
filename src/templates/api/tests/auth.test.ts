import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { app } from '../src';
import request from 'supertest';

describe('Auth Routes', () => {
  let server: any;

  beforeAll(() => {
    server = app.listen();
  });

  afterAll(() => {
    server.close();
  });

  it('should login user', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123',
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});