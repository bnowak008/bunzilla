import { join, dirname } from 'node:path';
import { readdir, stat, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { ProjectType } from '../types';

export class TemplateManager {
  private templatesDir: string;

  constructor() {
    const currentDir = dirname(fileURLToPath(import.meta.url));
    this.templatesDir = join(currentDir, '..', 'templates');
  }

  getTemplate(type: ProjectType): string {
    return join(this.templatesDir, type);
  }

  private async getAllFiles(dir: string): Promise<string[]> {
    const files: string[] = [];
    
    async function scan(directory: string, baseDir: string) {
      const entries = await readdir(directory);
      for (const entry of entries) {
        const fullPath = join(directory, entry);
        const relativePath = join(baseDir, entry);
        
        const stats = await stat(fullPath);
        if (stats.isDirectory()) {
          await scan(fullPath, relativePath);
        } else {
          files.push(relativePath);
        }
      }
    }

    await scan(dir, '');
    return files;
  }

  async processTemplate(templatePath: string, targetDir: string, variables: Record<string, string> = {}): Promise<void> {
    // Create directory
    await mkdir(targetDir, { recursive: true });
    
    // Copy template directory
    await Bun.spawn(['cp', '-r', `${templatePath}/.`, targetDir]);

    // Process template variables
    const files = await this.getAllFiles(targetDir);
    
    for (const file of files) {
      const filePath = join(targetDir, file);
      
      // Skip binary files
      if (!this.isTextFile(file)) continue;
      
      const content = await Bun.file(filePath).text();
      
      // Replace template variables
      const processed = Object.entries(variables).reduce(
        (acc, [key, value]) => acc.replace(new RegExp(`\\$\\{${key}\\}`, 'g'), value),
        content
      );
      
      await Bun.write(filePath, processed);
    }
  }

  private isTextFile(filename: string): boolean {
    const textExtensions = [
      '.ts', '.tsx', '.js', '.jsx', '.json', '.md', '.txt', 
      '.html', '.css', '.scss', '.yaml', '.yml', '.env',
      '.gitignore', '.npmignore', '.eslintrc', '.prettierrc'
    ];
    return textExtensions.some(textExt => filename.toLowerCase().endsWith(textExt));
  }
} 