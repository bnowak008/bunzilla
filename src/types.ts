export type ProjectType = 'utility' | 'webapp' | 'api' | 'monorepo' | 'cli';

export const projectTypes = [
  { title: 'Utility Package', value: 'utility' },
  { title: 'Web Application', value: 'webapp' },
  { title: 'API Service', value: 'api' },
  { title: 'Monorepo', value: 'monorepo' },
  { title: 'CLI Tool', value: 'cli' }
] as const satisfies Array<{ title: string; value: ProjectType }>;

export interface CLISteps {
  create: Array<{
    name: string;
    type: 'text' | 'select' | 'confirm';
    message: string;
    validate?: (input: string) => boolean | string;
    choices?: ReadonlyArray<{ title: string; value: string }>;
  }>;
  evolve: Array<{
    name: string;
    type: 'text' | 'select' | 'confirm';
    message: string;
    choices?: Array<{ title: string; value: string }>;
  }>;
  config: Array<{
    name: string;
    type: 'text' | 'select' | 'confirm';
    message: string;
    choices?: Array<{ title: string; value: string }>;
  }>;
}

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