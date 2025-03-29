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
    const { name } = validatedOptions;

    if (!name) {
      throw new BunzillaError(
        ErrorCode.INVALID_OPTIONS,
        'Project name is required'
      );
    }

    const spinner = ora('Creating your Bun monorepo project...').start();

    try {
      // Check if project name would create a path within the template directories
      const projectDir = join(process.cwd(), name);
      logger.debug(`Creating project at: ${projectDir}`);
      
      // Create monorepo with all the required components
      await processTemplate('monorepo', name);

      spinner.succeed(chalk.green(`Successfully created ${chalk.bold(name)}`));

      // Show project creation success message
      console.log('\n' + chalk.bgGreen.black(' SUCCESS ') + ' Project created successfully! 🎉\n');

      // Show project info
      console.log(chalk.cyan('📁 Project location:'));
      console.log(`   ${chalk.dim(join(process.cwd(), name))}\n`);

      // Show available scripts
      console.log(chalk.cyan('🔧 Available scripts:'));
      console.log(`   ${chalk.yellow('bun install')}         ${chalk.dim('Install dependencies')}`);
      console.log(`   ${chalk.yellow('bun run setup')}       ${chalk.dim('Install dependencies and set up database')}`);
      console.log(`   ${chalk.yellow('bun run dev')}         ${chalk.dim('Start all development servers')}`);
      console.log(`   ${chalk.yellow('bun run build')}       ${chalk.dim('Build for production')}`);
      
      // Show additional info about the stack
      console.log('\n' + chalk.cyan('🚀 Stack information:'));
      console.log(`   ${chalk.bold('Frontend:')} React with Vite`);
      console.log(`   ${chalk.bold('Backend:')} ElysiaJS`);
      console.log(`   ${chalk.bold('Database:')} SQLite with Drizzle ORM`);
    } catch (error) {
      spinner.fail(chalk.red('Failed to create project'));
      throw error;
    }
  } catch (error) {
    logger.error('Failed to create project:', error);
    throw error;
  }
}