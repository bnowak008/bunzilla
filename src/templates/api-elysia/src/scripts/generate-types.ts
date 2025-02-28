import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { cors } from '@elysiajs/cors';

// Import routes
import { healthRoutes } from '../routes/health';
import { apiRoutes } from '../routes/api';

// Import middleware
import { logger } from '../middleware/logger';

// Create a temporary app instance to generate types
const app = new Elysia()
  .use(swagger())
  .use(cors())
  .use(logger())
  .use(healthRoutes)
  .use(apiRoutes);

// Generate the type declaration
const typesPath = resolve(process.cwd(), 'src/types/eden-client.d.ts');
const typeContent = `// This file is auto-generated. Do not edit manually.
// Generated on ${new Date().toISOString()}

import type { App } from '../index';
import type { Elysia } from 'elysia';
import type { ElysiaApp } from '@elysiajs/eden';

// Export the Eden client type
export type EdenClient = ElysiaApp<App>;
`;

// Write the type declaration to a file
writeFileSync(typesPath, typeContent);

console.log(`✅ Eden client types generated at ${typesPath}`);
process.exit(0); 