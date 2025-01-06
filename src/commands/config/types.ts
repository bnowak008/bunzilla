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