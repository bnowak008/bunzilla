import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { app } from '../src';
import request from 'supertest';

describe('User Routes', () => {
  let server: any;

  beforeAll(() => {
    server = app.listen();
  });

  afterAll(() => {
    server.close();
  });

  it('should create user', async () => {
    const res = await request(server)
      .post('/api/users')
      .send({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.email).toBe('test@example.com');
    expect(res.body.name).toBe('Test User');
  });

  it('should get user by id', async () => {
    // First create a user
    const createRes = await request(server)
      .post('/api/users')
      .send({
        email: 'get@example.com',
        password: 'password123',
        name: 'Get User',
      });

    const userId = createRes.body.id;

    // Then get the user
    const getRes = await request(server).get(`/api/users/${userId}`);

    expect(getRes.status).toBe(200);
    expect(getRes.body.id).toBe(userId);
    expect(getRes.body.email).toBe('get@example.com');
    expect(getRes.body.name).toBe('Get User');
  });
});