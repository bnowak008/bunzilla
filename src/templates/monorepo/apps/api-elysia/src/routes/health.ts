import { Elysia } from 'elysia';
import { API_VERSION } from '@${projectName}/shared';

export const healthRoutes = new Elysia({ prefix: '/health' })
  .get('/', 
    () => ({ 
      status: 'ok', 
      version: API_VERSION,
      timestamp: new Date().toISOString() 
    }),
    {
      detail: {
        summary: 'Health Check',
        tags: ['Health'],
      }
    }
  )
  .get('/ping', 
    () => 'pong',
    {
      detail: {
        summary: 'Ping',
        tags: ['Health'],
      }
    }
  ); 