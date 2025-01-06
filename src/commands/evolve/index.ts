import { join } from 'node:path';
import { existsSync } from 'node:fs';
import chalk from 'chalk';
import ora from 'ora';
import { TemplateManager } from '../../utils/template-manager';
import { EvolveOptions } from './types';

export * from './types';

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
        const templatePath = templateManager.getTemplate(feature);
        if (!existsSync(templatePath)) {
          spinner.fail(chalk.red(`No template found for feature: ${feature}`));
          throw new Error(`No template found for feature: ${feature}`);
        }

        // Process template
        await templateManager.processTemplate(templatePath, projectPath);
      }
    }

    if (options.convert) {
      const templatePath = templateManager.getTemplate(options.convert);
      if (!existsSync(templatePath)) {
        spinner.fail(chalk.red(`No template found for type: ${options.convert}`));
        throw new Error(`No template found for type: ${options.convert}`);
      }

      // Process template
      await templateManager.processTemplate(templatePath, projectPath);
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