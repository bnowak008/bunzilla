import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';
import { API_VERSION } from '@${projectName}/shared';
import { db } from './db';

// Create main app
const app = new Elysia()
  // Middleware
  .use(cors())
  .use(
    swagger({
      documentation: {
        info: {
          title: '${projectName} API',
          version: API_VERSION,
        },
      },
    })
  )

  // Root route
  .get('/', () => ({
    message: 'Welcome to ${projectName} API',
    version: API_VERSION,
  }))

  // Example routes with database
  .group('/api', (app) => 
    app
      .get('/health', () => ({ status: 'ok', database: 'connected' }))
      
      // Example todos endpoints
      .group('/todos', (app) => 
        app
          .get('/', async () => {
            const todos = await db.select().from(db.schema.todos);
            return { todos };
          })
          .post('/', async ({ body }) => {
            const newTodo = await db.insert(db.schema.todos).values(body).returning();
            return { todo: newTodo[0] };
          })
          .get('/:id', async ({ params: { id } }) => {
            const todo = await db.select().from(db.schema.todos).where('id', '=', id);
            return { todo: todo[0] };
          })
      )
  )

  // Listen on port 3000
  .listen(3000);

console.log(
  `🦊 ${app.server?.hostname}:${app.server?.port} - Server is running`
);