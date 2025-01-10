import { z } from 'zod';
import type { ProjectType } from '../types.js';

export const projectTypeSchema = z.enum(['utility', 'webapp', 'api', 'monorepo', 'cli']);

export const createOptionsSchema = z.object({
  name: z.string().min(2).regex(/^[a-z0-9][a-z0-9-]*[a-z0-9]$/),
  type: z.enum(['utility', 'webapp', 'api', 'monorepo', 'cli']),
  frontend: z.enum(['react', 'solid', 'svelte', 'astro', 'ts'])
    .or(z.array(z.enum(['react', 'solid', 'svelte', 'astro', 'ts'])))
    .optional(),
  framework: z.enum(['hono', 'fastify', 'express'])
    .or(z.array(z.enum(['hono', 'fastify', 'express'])))
    .optional(),
  packages: z.enum(['all', 'frontend', 'backend', 'custom'])
    .or(z.array(z.enum(['all', 'frontend', 'backend', 'custom'])))
    .optional(),
  defaults: z.boolean().optional()
}).transform(data => ({
  ...data,
  frontend: Array.isArray(data.frontend) ? data.frontend[0] : data.frontend,
  framework: Array.isArray(data.framework) ? data.framework[0] : data.framework,
  packages: Array.isArray(data.packages) ? data.packages[0] : data.packages
}));

export type ValidatedCreateOptions = z.infer<typeof createOptionsSchema>; 