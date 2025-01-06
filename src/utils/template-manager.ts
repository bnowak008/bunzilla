import { join } from 'node:path';
import { mkdir, cp } from 'node:fs/promises';
import { ProjectType } from '../types';

export class TemplateManager {
  private templatesDir: string;

  constructor() {
    this.templatesDir = join(__dirname, '..', 'templates');
  }

  getTemplate(type: ProjectType): string {
    return join(this.templatesDir, type);
  }

  async processTemplate(templatePath: string, targetDir: string): Promise<void> {
    // Create the target directory
    await mkdir(targetDir, { recursive: true });

    // Copy the template directory to the target directory
    await cp(templatePath, targetDir, { recursive: true });

    // TODO: Process any template variables (like project name) in the copied files
  }
} 