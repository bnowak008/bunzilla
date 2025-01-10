import { join } from 'node:path';
import { existsSync } from 'node:fs';
import chalk from 'chalk';
import ora from 'ora';
import { TemplateManager } from '../../utils/template-manager.js';
import type { EvolveOptions } from './types.js';

export * from './types.js';

export async function evolve(options: EvolveOptions): Promise<void> {
  const spinner = ora('Evolving project...').start();

  try {
    const projectPath = join(process.cwd(), options.projectDir);

    // Check if directory exists
    if (!existsSync(projectPath)) {
      spinner.fail(chalk.red(`Directory ${options.projectDir} does not exist`));
      throw new Error(`Directory ${options.projectDir} does not exist`);
    }

    const templateManager = new TemplateManager();

    if (options.add) {
      for (const feature of options.add) {
        // Process each feature directly as a ProjectType
        await templateManager.processTemplate(feature, projectPath);
      }
    }

    if (options.convert) {
      // Process conversion directly as a ProjectType
      await templateManager.processTemplate(options.convert, projectPath);
    }

    spinner.succeed(chalk.green('Project evolved successfully'));
    
    console.log('\nNext steps:');
    console.log(chalk.cyan('  bun install'));
    console.log(chalk.cyan('  bun run build'));
  } catch (error) {
    spinner.fail(chalk.red('Failed to evolve project'));
    throw error;
  }
} 