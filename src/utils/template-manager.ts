import { join, dirname } from 'node:path';
import { readdir, stat, mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { ProjectType } from '../types.js';
import { logger } from './logger.js';
import { ErrorCode, BunzillaError } from './errors.js';

export class TemplateManager {
  private templatesDir: string;
  private readonly templateVariables: Record<string, string>;

  constructor() {
    const currentDir = dirname(fileURLToPath(import.meta.url));
    this.templatesDir = join(currentDir, '..', 'templates');
    this.templateVariables = {};
  }

  private getTemplate(type: ProjectType): string {
    const templatePath = join(this.templatesDir, type);
    return templatePath;
  }

  setVariable(key: string, value: string): void {
    this.templateVariables[key] = value;
  }

  private async processFileContent(content: string): Promise<string> {
    return content.replace(/\$\{([^}]+)\}/g, (_, key) => 
      this.templateVariables[key] || '${' + key + '}'
    );
  }

  async processTemplate(type: ProjectType, targetName: string): Promise<void> {
    const templatePath = this.getTemplate(type);
    const targetPath = join(process.cwd(), targetName);

    try {
      // Set up basic variables
      this.setVariable('projectName', targetName);
      
      // Create target directory
      await mkdir(targetPath, { recursive: true });

      // Process all files
      const files = await this.getAllFiles(templatePath);
      
      for (const file of files) {
        const sourcePath = join(templatePath, file);
        const targetFilePath = join(targetPath, file);
        const targetDir = dirname(targetFilePath);

        // Ensure target directory exists
        await mkdir(targetDir, { recursive: true });

        // Read and process file content
        const content = await readFile(sourcePath, 'utf-8');
        const processedContent = await this.processFileContent(content);

        // Write processed content
        await writeFile(targetFilePath, processedContent);
        
        logger.debug(`Processed file: ${file}`);
      }
    } catch (error) {
      logger.error('Failed to process template:', error);
      throw error;
    }
  }

  private async getAllFiles(dir: string): Promise<string[]> {
    const files: string[] = [];
    
    async function scan(directory: string, baseDir: string) {
      const entries = await readdir(directory);
      for (const entry of entries) {
        const fullPath = join(directory, entry);
        const stats = await stat(fullPath);
        
        if (stats.isDirectory()) {
          await scan(fullPath, baseDir);
        } else {
          const relativePath = fullPath.slice(baseDir.length + 1);
          files.push(relativePath);
        }
      }
    }

    await scan(dir, dir);
    return files;
  }
} 