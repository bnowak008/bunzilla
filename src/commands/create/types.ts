export type ProjectType = 'utility' | 'webapp' | 'api' | 'monorepo' | 'cli';

export type WebAppOptions = {
  frontend: 'react' | 'solid' | 'svelte';
};

export type ApiOptions = {
  framework: 'hono' | 'fastify' | 'express';
};

export type CreateOptions = 
  | {
      defaults: true;
      name: string;
      type: 'utility' | 'monorepo' | 'cli';
    }
  | {
      defaults: true;
      name: string;
      type: 'webapp';
      frontend: WebAppOptions['frontend'];
    }
  | {
      defaults: true;
      name: string;
      type: 'api';
      framework: ApiOptions['framework'];
    }
  | {
      defaults: false;
      name?: string;
      type?: ProjectType;
      frontend?: WebAppOptions['frontend'];
      framework?: ApiOptions['framework'];
    }; 