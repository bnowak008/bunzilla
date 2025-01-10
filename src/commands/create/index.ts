import { join } from 'node:path';
import chalk from 'chalk';
import ora from 'ora';
import { 
  createOptionsSchema,
  logger,
  processTemplate,
  ErrorCode,
  BunzillaError 
} from '../../utils/index';
import type { CreateOptions } from '../../types';

export async function create(options: CreateOptions): Promise<void> {
  try {
    const validatedOptions = createOptionsSchema.parse(options);
    const { name, type } = validatedOptions;

    if (!name || !type) {
      throw new BunzillaError(
        ErrorCode.INVALID_OPTIONS,
        'Project name and type are required'
      );
    }

    const spinner = ora('Creating your project...').start();

    try {
      // Handle different project types
      switch (type) {
        case 'webapp': {
          if (!options.frontend) {
            throw new BunzillaError(
              ErrorCode.INVALID_OPTIONS,
              'Frontend framework must be selected for webapp projects'
            );
          }
          const templatePath = `webapp-${options.frontend}`;
          await processTemplate(templatePath, name);
          break;
        }
        case 'api': {
          const templatePath = options.framework 
            ? `api-${options.framework}`
            : 'api';
          await processTemplate(templatePath, name);
          break;
        }
        case 'monorepo': {
          // Create base monorepo structure
          await processTemplate('monorepo', name);
          
          // Set default frameworks if not explicitly chosen
          const frontend = options.frontend || 'react';
          const framework = options.framework || 'hono';
          
          // Process selected packages
          if (options.packages === 'all') {
            await processTemplate(`webapp-${frontend}`, join(process.cwd(), name, 'apps/web'));
            await processTemplate(`api-${framework}`, join(process.cwd(), name, 'apps/api'));
            // Create shared package using utility template
            await processTemplate('utility', join(process.cwd(), name, 'packages/shared'));
          } else if (options.packages === 'frontend') {
            await processTemplate(`webapp-${frontend}`, join(process.cwd(), name, 'apps/web'));
          } else if (options.packages === 'backend') {
            await processTemplate(`api-${framework}`, join(process.cwd(), name, 'apps/api'));
          }
          break;
        }
        default:
          await processTemplate(type, name);
      }

      spinner.succeed(chalk.green(`Successfully created ${chalk.bold(name)}`));

      // Show project creation success message
      console.log('\n' + chalk.bgGreen.black(' SUCCESS ') + ' Project created successfully! 🎉\n');

      // Show project info
      console.log(chalk.cyan('📁 Project location:'));
      console.log(`   ${chalk.dim(join(process.cwd(), name))}\n`);

      // Show available scripts
      console.log(chalk.cyan('🔧 Available scripts:'));
      console.log(`   ${chalk.yellow('bun install')}         ${chalk.dim('Install dependencies')}`);
      console.log(`   ${chalk.yellow('bun run dev')}         ${chalk.dim('Start development server')}`);
      console.log(`   ${chalk.yellow('bun run build')}       ${chalk.dim('Build for production')}`);
    } catch (error) {
      spinner.fail(chalk.red('Failed to create project'));
      throw error;
    }
  } catch (error) {
    logger.error('Failed to create project:', error);
    throw error;
  }
}