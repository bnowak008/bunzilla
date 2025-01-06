import { ProjectType } from '../create/types';

export interface EvolveOptions {
  add?: ProjectType[];
  convert?: ProjectType;
  projectDir: string;
} 