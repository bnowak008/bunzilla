import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono } from '@hono/zod-openapi';
import { env } from './config/env';
import { authMiddleware } from './middleware/auth';
import { errorHandler } from './middleware/error';
import { userRoutes } from './routes/users';
import { authRoutes } from './routes/auth';

const app = new OpenAPIHono();
const api = new OpenAPIHono();

// Middleware
app.use('*', logger());
app.use('*', cors());
app.use('*', prettyJSON());
app.use('*', errorHandler());

// API Routes
api.route('/auth', authRoutes);
api.route('/users', userRoutes);

// Protected routes
api.use('/users/*', authMiddleware);

// Mount API routes
app.route('/api', api);

// Swagger documentation
app.get(
  '/docs',
  swaggerUI({
    url: '/docs.json',
  })
);

app.doc('/docs.json', {
  openapi: '3.0.0',
  info: {
    title: '${projectName} API',
    version: '1.0.0',
  },
});

// Health check
app.get('/health', (c) => c.json({ status: 'ok' }));

serve(app, () => {
  console.log(`Server is running on http://${env.HOST}:${env.PORT}`);
});