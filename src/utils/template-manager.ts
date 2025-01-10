import { join, dirname } from 'node:path';
import { readdir, stat, mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { ProjectType } from '../types.js';
import { logger } from './logger.js';

type TemplateVariables = Record<string, string>;

function getRootDir(): string {
  const currentDir = dirname(fileURLToPath(import.meta.url));
  const isDistBuild = currentDir.includes('dist');

  // Navigate up until we find either the src or dist directory
  let rootDir = currentDir;
  while (rootDir && !rootDir.endsWith('dist') && !rootDir.endsWith('src')) {
    rootDir = dirname(rootDir);
  }
  
  // Go up one more level to get to project root if we're in src
  if (rootDir.endsWith('src')) {
    rootDir = dirname(rootDir);
  }

  console.log('Root directory:', rootDir);
  return rootDir;
}

function getTemplatesDir(): string {
  const rootDir = getRootDir();
  const isDistBuild = rootDir.endsWith('dist');

  console.log('Is dist build:', isDistBuild);

  const templatesPath = isDistBuild
    ? join(rootDir, 'templates')
    : join(rootDir, 'src', 'templates');

  logger.debug('Templates path:', templatesPath);
  
  return templatesPath;
}

function getTemplatePath(type: ProjectType): string {
  return join(getTemplatesDir(), type);
}

async function getAllFiles(dir: string): Promise<string[]> {
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

function processFileContent(content: string, variables: TemplateVariables): string {
  return content.replace(/\$\{([^}]+)\}/g, (_, key) => 
    variables[key] || '${' + key + '}'
  );
}

export async function processTemplate(
  type: ProjectType, 
  targetName: string, 
  variables: TemplateVariables = {}
): Promise<void> {
  const templatePath = getTemplatePath(type);
  const targetPath = join(process.cwd(), targetName);
  const templateVariables = { ...variables, projectName: targetName };

  try {
    // Create target directory
    await mkdir(targetPath, { recursive: true });

    // Process all files
    const files = await getAllFiles(templatePath);
    
    for (const file of files) {
      const sourcePath = join(templatePath, file);
      const targetFilePath = join(targetPath, file);
      const targetDir = dirname(targetFilePath);

      // Ensure target directory exists
      await mkdir(targetDir, { recursive: true });

      // Read and process file content
      const content = await readFile(sourcePath, 'utf-8');
      const processedContent = processFileContent(content, templateVariables);

      // Write processed content
      await writeFile(targetFilePath, processedContent);
      
      logger.debug(`Processed file: ${file}`);
    }
  } catch (error) {
    logger.error('Failed to process template:', error);
    throw error;
  }
} 