import { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { jwtVerify } from 'jose';
import { env } from '../config/env';

const encoder = new TextEncoder();

export async function authMiddleware(c: Context, next: () => Promise<void>) {
  try {
    const token = c.req.header('Authorization')?.split(' ')[1];
    if (!token) throw new HTTPException(401, { message: 'Unauthorized' });

    const { payload } = await jwtVerify(token, encoder.encode(env.JWT_SECRET));
    c.set('user', payload);

    await next();
  } catch (error) {
    throw new HTTPException(401, { message: 'Unauthorized' });
  }
}