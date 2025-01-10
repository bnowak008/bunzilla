import { z } from 'zod';
import type { ProjectType } from '../types.js';

export const projectTypeSchema = z.enum(['utility', 'webapp', 'api', 'monorepo', 'cli']);

const baseSchema = z.object({
  name: z.string().min(2).regex(/^[a-z0-9][a-z0-9-]*[a-z0-9]$/),
  defaults: z.boolean(),
});

export const createOptionsSchema = z.discriminatedUnion('type', [
  baseSchema.extend({
    type: z.literal('utility'),
  }),
  baseSchema.extend({
    type: z.literal('monorepo'),
  }),
  baseSchema.extend({
    type: z.literal('cli'),
  }),
  baseSchema.extend({
    type: z.literal('webapp'),
    frontend: z.enum(['react', 'solid', 'svelte']).optional(),
  }),
  baseSchema.extend({
    type: z.literal('api'),
    framework: z.enum(['hono', 'fastify', 'express']).optional(),
  }),
]);

export type ValidatedCreateOptions = z.infer<typeof createOptionsSchema>; 