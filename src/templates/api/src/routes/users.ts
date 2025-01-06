import { OpenAPIHono } from '@hono/zod-openapi';
import { z } from 'zod';
import { db } from '../config/db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';

const route = new OpenAPIHono();

const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string(),
});

route.openapi(
  '/',
  {
    method: 'POST',
    description: 'Create user',
    request: {
      body: {
        content: {
          'application/json': {
            schema: createUserSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Success',
        content: {
          'application/json': {
            schema: z.object({
              id: z.string(),
              email: z.string(),
              name: z.string(),
            }),
          },
        },
      },
    },
  },
  async (c) => {
    const data = await c.req.json();

    const user = await db
      .insert(users)
      .values(data)
      .returning({ id: users.id, email: users.email, name: users.name });

    return c.json(user[0], 201);
  }
);

route.openapi(
  '/:id',
  {
    method: 'GET',
    description: 'Get user by ID',
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: z.object({
              id: z.string(),
              email: z.string(),
              name: z.string(),
            }),
          },
        },
      },
    },
  },
  async (c) => {
    const id = c.req.param('id');

    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
      columns: {
        id: true,
        email: true,
        name: true,
      },
    });

    if (!user) {
      return c.json({ error: 'User not found' }, 404);
    }

    return c.json(user);
  }
);

export { route as userRoutes };