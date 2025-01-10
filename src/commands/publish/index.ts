import { join } from 'node:path';
import { existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import chalk from 'chalk';
import ora from 'ora';
import { PublishOptions } from './types';

export * from './types';

export async function publish(options: PublishOptions): Promise<void> {
  const spinner = ora('Publishing project...').start();

  try {
    const projectPath = join(process.cwd(), options.projectDir);

    // Check if directory exists
    if (!existsSync(projectPath)) {
      spinner.fail(chalk.red(`Directory ${options.projectDir} does not exist`));
      throw new Error(`Directory ${options.projectDir} does not exist`);
    }

    // Check if package.json exists
    const packageJsonPath = join(projectPath, 'package.json');
    if (!existsSync(packageJsonPath)) {
      spinner.fail(chalk.red('No package.json found'));
      throw new Error('No package.json found');
    }

    // Check if git repository exists
    if (!existsSync(join(projectPath, '.git'))) {
      spinner.fail(chalk.red('Not a git repository'));
      throw new Error('Not a git repository');
    }

    // Run build first
    spinner.text = 'Building project...';
    execSync('bun run build', { cwd: projectPath, stdio: 'pipe' });

    // Run tests
    spinner.text = 'Running tests...';
    execSync('bun test', { cwd: projectPath, stdio: 'pipe' });

    // Run type check
    spinner.text = 'Running type check...';
    execSync('bun run typecheck', { cwd: projectPath, stdio: 'pipe' });

    // Run linter
    spinner.text = 'Running linter...';
    execSync('bun run lint', { cwd: projectPath, stdio: 'pipe' });

    // Check git status
    spinner.text = 'Checking git status...';
    const gitStatus = execSync('git status --porcelain', { cwd: projectPath }).toString();
    if (gitStatus.length > 0) {
      spinner.fail(chalk.red('Working directory is not clean. Please commit or stash changes.'));
      throw new Error('Working directory is not clean');
    }

    if (!options.dryRun) {
      // Publish to npm
      spinner.text = 'Publishing to npm...';
      execSync('npm publish --access public', { cwd: projectPath, stdio: 'pipe' });
    }

    spinner.succeed(chalk.green(`Project ${options.dryRun ? 'ready to publish' : 'published successfully'}`));
    
    if (options.dryRun) {
      console.log('\nTo publish:');
      console.log(chalk.cyan('  npm publish --access public'));
    }
  } catch (error) {
    spinner.fail(chalk.red('Failed to publish project'));
    throw error;
  }
} 