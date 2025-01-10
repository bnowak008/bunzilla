import { join, dirname } from 'node:path';
import { readdir, stat, mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { copy } from 'fs-extra';
import { fileURLToPath } from 'node:url';
import { ProjectType } from '../types.js';
import { logger } from './logger.js';
import { ErrorCode, BunzillaError } from './errors.js';

type TemplateVariables = Record<string, string>;

function getRootDir(): string {
  const currentDir = dirname(fileURLToPath(import.meta.url));

  // Navigate up until we find either the src or dist directory
  let rootDir = currentDir;
  while (rootDir && !rootDir.endsWith('dist') && !rootDir.endsWith('src')) {
    rootDir = dirname(rootDir);
  }
  
  // Go up one more level to get to project root if we're in src
  if (rootDir.endsWith('src')) {
    rootDir = dirname(rootDir);
  }
  return rootDir;
}

function getTemplatesDir(): string {
  const rootDir = getRootDir();
  const isDistBuild = rootDir.endsWith('dist');

  const templatesPath = isDistBuild
    ? join(rootDir, 'templates')
    : join(rootDir, 'src', 'templates');

  if (!existsSync(templatesPath)) {
    throw new BunzillaError(
      ErrorCode.TEMPLATE_NOT_FOUND,
      `Templates directory not found at ${templatesPath}`
    );
  }

  return templatesPath;
}

export function getTemplatePath(templateType: ProjectType | string): string {
  const templatesDir = getTemplatesDir();
  return join(templatesDir, templateType);
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
  // For Astro files, we need to handle the variables differently
  if (content.startsWith('---')) {
    // Handle frontmatter separately
    const [frontmatter, ...rest] = content.split('---');
    const processedContent = rest.join('---').replace(/\$\{([^}]+)\}/g, (_, key) => 
      variables[key] || ''
    );
    return `---${frontmatter}---${processedContent}`;
  }

  return content.replace(/\$\{([^}]+)\}/g, (_, key) => 
    variables[key] || ''
  );
}

async function processTemplateFiles(
  projectPath: string,
  variables: Record<string, string>
): Promise<void> {
  const files = await getAllFiles(projectPath);
  
  for (const file of files) {
    const filePath = join(projectPath, file);
    const content = await readFile(filePath, 'utf-8');
    const processedContent = processFileContent(content, variables);
    await writeFile(filePath, processedContent);
  }
}

export async function processTemplate(
  templateType: string,
  projectName: string,
): Promise<void> {
  const templatePath = getTemplatePath(templateType as ProjectType);
  const projectPath = join(process.cwd(), projectName);

  // Ensure template exists
  if (!existsSync(templatePath)) {
    throw new BunzillaError(
      ErrorCode.TEMPLATE_NOT_FOUND,
      `Template ${templateType} not found`
    );
  }

  // Create project directory
  await mkdir(projectPath, { recursive: true });

  // Copy template files
  await copy(templatePath, projectPath);

  // Process template variables
  await processTemplateFiles(projectPath, {
    projectName,
    templateType,
  });
} 