import { join } from 'node:path';
import { existsSync } from 'node:fs';
import chalk from 'chalk';
import ora from 'ora';
import { TemplateManager } from '../utils/template-manager';
import { CreateOptions } from '../types';

export async function create(options: CreateOptions): Promise<void> {
  const spinner = ora('Creating project...').start();

  if (!options.name) {
    spinner.fail(chalk.red('Project name is required'));
    throw new Error('Project name is required');
  }

  if (!options.type) {
    spinner.fail(chalk.red('Project type is required'));
    throw new Error('Project type is required');
  }

  try {
    const projectDir = join(process.cwd(), options.name);

    // Check if directory already exists
    if (existsSync(projectDir)) {
      spinner.fail(chalk.red(`Directory ${options.name} already exists`));
      throw new Error(`Directory ${options.name} already exists`);
    }

    const templateManager = new TemplateManager();
    const templatePath = templateManager.getTemplate(options.type);

    if (!existsSync(templatePath)) {
      spinner.fail(chalk.red(`No template found for type: ${options.type}`));
      throw new Error(`No template found for type: ${options.type}`);
    }

    // Process template
    await templateManager.processTemplate(templatePath, projectDir);

    spinner.succeed(chalk.green(`Project ${options.name} created successfully`));
    
    console.log('\nNext steps:');
    console.log(chalk.cyan(`  cd ${options.name}`));
    console.log(chalk.cyan('  bun install'));
    console.log(chalk.cyan('  bun run dev'));
  } catch (error) {
    spinner.fail(chalk.red('Failed to create project'));
    throw error;
  }
} 