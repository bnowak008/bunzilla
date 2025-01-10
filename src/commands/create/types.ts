export type BaseCreateOptions = {
  name: string;
  defaults: boolean;
}

export type CreateOptions = 
  | (BaseCreateOptions & { type: 'utility' })
  | (BaseCreateOptions & { type: 'monorepo' })
  | (BaseCreateOptions & { type: 'cli' })
  | (BaseCreateOptions & { 
      type: 'webapp';
      frontend?: 'react' | 'solid' | 'svelte';
    })
  | (BaseCreateOptions & {
      type: 'api';
      framework?: 'hono' | 'fastify' | 'express';
    }); 