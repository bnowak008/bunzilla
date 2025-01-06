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

export interface Template {
  name: string;
  description: string;
  type: string;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  scripts: Record<string, string>;
  files: Record<string, string>;
}

export interface EvolveOptions {
  add?: ProjectType[];
  convert?: ProjectType;
  projectDir: string;
}

export interface PublishOptions {
  projectDir: string;
  dryRun?: boolean;
}

export interface ConfigOptions {
  get?: string;
  set?: string;
  value?: string;
  list?: boolean;
} 

export type Config = {
  defaultTemplate: string;
  defaultFramework: string;
  defaultFrontend: string;
  [key: string]: string;
}

export const DEFAULT_CONFIG: Config = {
  defaultTemplate: 'utility',
  defaultFramework: 'hono',
  defaultFrontend: 'react',
};