import type { ProjectType } from '../../types.js';

export interface EvolveOptions {
  projectDir: string;
  add?: ProjectType[];
  convert?: ProjectType;
} 