import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { cors } from '@elysiajs/cors';
import { API_VERSION } from '@${projectName}/shared';

// Import routes
import { healthRoutes } from './routes/health';
import { apiRoutes } from './routes/api';

// Import middleware
import { logger } from './middleware/logger';

// Configuration
const config = {
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  environment: process.env.NODE_ENV || 'development',
};

// Create Elysia app
const app = new Elysia()
  // Add plugins
  .use(swagger({
    documentation: {
      info: {
        title: '${projectName} API',
        version: API_VERSION,
      },
      tags: [
        { name: 'Health', description: 'Health check endpoints' },
        { name: 'API', description: 'API endpoints' },
      ],
    }
  }))
  .use(cors())
  
  // Add middleware
  .use(logger())
  
  // Add routes
  .use(healthRoutes)
  .use(apiRoutes)
  
  // Global error handler
  .onError(({ code, error, set }) => {
    console.error(`Error [${code}]:`, error);
    
    if (code === 'NOT_FOUND') {
      set.status = 404;
      return {
        success: false,
        error: 'Not Found',
        message: 'The requested resource was not found',
      };
    }
    
    set.status = 500;
    return {
      success: false,
      error: 'Internal Server Error',
      message: error.message,
    };
  });

// Start the server
app.listen(config.port, () => {
  console.log(`🦊 Server is running at http://localhost:${config.port}`);
  console.log(`📚 Swagger documentation available at http://localhost:${config.port}/swagger`);
  
  if (config.environment === 'development') {
    console.log(`🔧 Running in development mode`);
    console.log(`🔖 API Version: ${API_VERSION}`);
  }
});

// Export type for Eden client generation
export type App = typeof app; 