import { z } from 'zod';

// Simplified project type schema - we now only support monorepo
export const projectTypeSchema = z.literal('monorepo');

// Simplified create options schema - we only need the project name
export const createOptionsSchema = z.object({
  name: z.string().min(2).regex(/^[a-z0-9][a-z0-9-]*[a-z0-9]$/),
  defaults: z.boolean().optional()
});

export type ValidatedCreateOptions = z.infer<typeof createOptionsSchema>; 