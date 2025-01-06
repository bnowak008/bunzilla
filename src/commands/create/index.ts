import { join } from 'node:path';
import { existsSync } from 'node:fs';
import chalk from 'chalk';
import ora from 'ora';
import { TemplateManager } from '../../utils/template-manager';
import { CreateOptions, ProjectType } from './types';
import inquirer from 'inquirer';

export * from './types';

export async function create(options: CreateOptions): Promise<void> {
  const spinner = ora('Creating project...').start();
  spinner.stop(); // Stop spinner before prompts

  try {
    // Always prompt for project name, using passed name as default
    const { name } = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is your project named?',
        default: options.name,
        validate: (input: string) => {
          if (/^[a-z0-9-]+$/.test(input)) return true;
          return 'Project name may only include lowercase letters, numbers, and hyphens';
        },
      },
    ]);

    // Update options with prompted name
    options.name = name;

    // Prompt for project type if not provided
    if (!options.type) {
      const { type } = await inquirer.prompt([{
        type: 'list',
        name: 'type',
        message: 'What type of project would you like to create?',
        choices: ['utility', 'webapp', 'api', 'monorepo', 'cli'] as ProjectType[],
      }]);
      options.type = type;
    }

    spinner.start('Creating project...');

    const projectDir = join(process.cwd(), name);

    // Check if directory already exists
    if (existsSync(projectDir)) {
      spinner.fail(chalk.red(`Directory ${name} already exists`));
      throw new Error(`Directory ${name} already exists`);
    }

    const templateManager = new TemplateManager();
    const templatePath = templateManager.getTemplate(options.type as ProjectType);

    if (!existsSync(templatePath)) {
      spinner.fail(chalk.red(`No template found for type: ${options.type}`));
      throw new Error(`No template found for type: ${options.type}`);
    }

    // Process template
    await templateManager.processTemplate(templatePath, projectDir);

    spinner.succeed(chalk.green(`Project ${name} created successfully`));
    
    console.log('\nNext steps:');
    console.log(chalk.cyan(`  cd ${name}`));
    console.log(chalk.cyan('  bun install'));
    console.log(chalk.cyan('  bun run dev'));
  } catch (error) {
    spinner.fail(chalk.red('Failed to create project'));
    throw error;
  }
} 