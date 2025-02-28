import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
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

// Generate the type declaration for the API
const apiTypesPath = resolve(process.cwd(), 'src/types/eden-client.d.ts');
const apiTypeContent = `// This file is auto-generated. Do not edit manually.
// Generated on ${new Date().toISOString()}

import type { App } from '../index';
import type { Elysia } from 'elysia';
import type { ElysiaApp } from '@elysiajs/eden';

// Export the Eden client type
export type EdenClient = ElysiaApp<App>;
`;

// Generate the type declaration for the shared package
const sharedTypesPath = resolve(process.cwd(), '../../packages/shared/src/eden-types.ts');
const sharedTypeContent = `// This file is auto-generated. Do not edit manually.
// Generated on ${new Date().toISOString()}

import type { App } from '@${projectName}/api/src/index';
import type { ElysiaApp } from '@elysiajs/eden';

// Export the Eden client type
export type EdenClient = ElysiaApp<App>;

// Export the treaty function type
export type Treaty = () => EdenClient;
`;

// Ensure directories exist
mkdirSync(dirname(apiTypesPath), { recursive: true });
mkdirSync(dirname(sharedTypesPath), { recursive: true });

// Write the type declarations to files
writeFileSync(apiTypesPath, apiTypeContent);
writeFileSync(sharedTypesPath, sharedTypeContent);

console.log(`✅ Eden client types generated at ${apiTypesPath}`);
console.log(`✅ Shared Eden types generated at ${sharedTypesPath}`);
process.exit(0); 