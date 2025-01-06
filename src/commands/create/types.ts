export type ProjectType = 'utility' | 'webapp' | 'api' | 'monorepo' | 'cli';

export type WebAppOptions = {
  frontend: 'react' | 'solid' | 'svelte';
};

export type ApiOptions = {
  framework: 'hono' | 'fastify' | 'express';
};

export type CreateOptions = {
  name?: string;
  type?: ProjectType;
  frontend?: WebAppOptions['frontend'];
  framework?: ApiOptions['framework'];
  defaults?: boolean;
}; 