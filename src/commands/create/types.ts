export type ProjectType = 'utility' | 'webapp' | 'api' | 'monorepo' | 'cli';

export interface CreateOptions {
  name: string;
  type: ProjectType;
  defaults?: boolean;
} 