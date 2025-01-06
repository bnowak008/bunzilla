import { OpenAPIHono } from '@hono/zod-openapi';
import { z } from 'zod';
import { SignJWT } from 'jose';
import { HTTPException } from 'hono/http-exception';
import { db } from '../config/db';
import { users } from '../db/schema';
import { env } from '../config/env';
import { eq } from 'drizzle-orm';

const encoder = new TextEncoder();

const route = new OpenAPIHono();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

route.openapi(
  '/login',
  {
    method: 'POST',
    description: 'Login user',
    request: {
      body: {
        content: {
          'application/json': {
            schema: loginSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: z.object({
              token: z.string(),
            }),
          },
        },
      },
    },
  },
  async (c) => {
    const { email, password } = await c.req.json();

    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user || user.password !== password) {
      throw new HTTPException(401, { message: 'Invalid credentials' });
    }

    const token = await new SignJWT({ sub: user.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(encoder.encode(env.JWT_SECRET));

    return c.json({ token });
  }
);

export { route as authRoutes };