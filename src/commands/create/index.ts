import { join } from 'node:path';
import chalk from 'chalk';
import ora from 'ora';
import { 
  createOptionsSchema,
  logger,
  TemplateManager,
  ErrorCode,
  BunzillaError 
} from '../../utils/index.js';
import type { CreateOptions } from './types.js';

export async function create(options: CreateOptions): Promise<void> {
  try {
    // Validate options
    const validatedOptions = createOptionsSchema.parse(options);
    const { name, type } = validatedOptions;

    // After validation, we know these are defined
    if (!name || !type) {
      throw new BunzillaError(
        ErrorCode.INVALID_OPTIONS,
        'Project name and type are required'
      );
    }

    const spinner = ora('Creating your project...').start();

    try {
      const templateManager = new TemplateManager();
      await templateManager.processTemplate(type, name);

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
      console.log(`   ${chalk.yellow('bun test')}            ${chalk.dim('Run tests')}`);
      console.log(`   ${chalk.yellow('bun run lint')}        ${chalk.dim('Lint code')}`);
      console.log(`   ${chalk.yellow('bun run format')}      ${chalk.dim('Format code')}\n`);

      // Show next steps
      console.log(chalk.cyan('📝 Next steps:'));
      console.log(`   1. ${chalk.yellow(`cd ${name}`)}`);
      console.log(`   2. ${chalk.yellow('bun install')}`);
      console.log(`   3. ${chalk.yellow('bun run dev')}\n`);

      // Show additional info based on project type
      switch (type) {
        case 'webapp':
          console.log(chalk.cyan('🌐 Development server:'));
          console.log(`   ${chalk.dim('Local:')}            ${chalk.green('http://localhost:5173/')}`);
          console.log(`   ${chalk.dim('Network:')}          ${chalk.green('http://localhost:5173/')}\n`);
          break;
        case 'api':
          console.log(chalk.cyan('🚀 API server:'));
          console.log(`   ${chalk.dim('Local:')}            ${chalk.green('http://localhost:3000/')}`);
          console.log(`   ${chalk.dim('Documentation:')}    ${chalk.green('http://localhost:3000/docs')}\n`);
          break;
      }

      // Show documentation link
      console.log(chalk.cyan('📚 Documentation:'));
      console.log(`   ${chalk.blue.underline('https://github.com/bnowak008/bunzilla#readme')}\n`);

      // Show support info
      console.log(chalk.dim('Need help? Open an issue at https://github.com/bnowak008/bunzilla/issues\n'));

    } catch (error) {
      spinner.fail(chalk.red('Failed to create project'));
      logger.error('Project creation failed', error);
      process.exit(1);
    }
  } catch (error) {
    logger.error('Invalid options provided', error);
    process.exit(1);
  }
}