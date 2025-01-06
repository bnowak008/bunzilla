import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { API_VERSION } from '@${projectName}/shared';

const app = new Hono();

app.use('*', logger());
app.use('*', cors());

app.get('/', (c) => c.json({ 
  message: 'Welcome to ${projectName} API',
  version: API_VERSION,
}));

serve(app, () => {
  console.log('Server is running on http://localhost:3000');
});