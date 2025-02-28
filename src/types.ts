export const webappFrameworks = [
  { title: 'React', value: 'react' },
  { title: 'Solid', value: 'solid' },
  { title: 'Svelte', value: 'svelte' },
  { title: 'Astro', value: 'astro' },
  { title: 'TypeScript', value: 'ts' }
] as const;

export const apiFrameworks = [
  { title: 'Hono', value: 'hono' },
  { title: 'Fastify', value: 'fastify' },
  { title: 'Express', value: 'express' },
  { title: 'Elysia', value: 'elysia' }
] as const;

export type WebAppFramework = typeof webappFrameworks[number]['value'];
export type ApiFramework = typeof apiFrameworks[number]['value'];

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
  frontend: 'react' | 'solid' | 'svelte' | 'astro' | 'ts';
};

export type ApiOptions = {
  framework: 'hono' | 'fastify' | 'express' | 'elysia';
};

export type MonorepoPackage = 'all' | 'frontend' | 'backend' | 'custom';

export const monorepoPackages = [
  { title: 'All (Frontend + Backend + Shared)', value: 'all' },
  { title: 'Frontend Only', value: 'frontend' },
  { title: 'Backend Only', value: 'backend' },
  { title: 'Custom Selection', value: 'custom' }
] as const;

export type CreateOptions = {
  name: string;
  type: ProjectType;
  frontend?: WebAppFramework;
  framework?: ApiFramework;
  packages?: MonorepoPackage;
  defaults?: boolean;
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