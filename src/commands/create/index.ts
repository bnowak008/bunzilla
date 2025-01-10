import { join } from 'node:path';
import chalk from 'chalk';
import ora from 'ora';
import { 
  createOptionsSchema,
  logger,
  processTemplate,
  ErrorCode,
  BunzillaError 
} from '../../utils/index.js';
import type { CreateOptions } from './types.js';

export async function create(options: CreateOptions): Promise<void> {
  try {
    // Validate options
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
      await processTemplate(type, name);

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