import { join } from 'node:path';
import { existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import chalk from 'chalk';
import ora from 'ora';

interface PublishOptions {
  projectDir: string;
  dryRun?: boolean;
}

export async function publish(options: PublishOptions): Promise<void> {
  const spinner = ora('Publishing project...').start();

  try {
    const projectPath = join(process.cwd(), options.projectDir);

    // Check if directory exists
    if (!existsSync(projectPath)) {
      spinner.fail(chalk.red(`Directory ${options.projectDir} does not exist`));
      throw new Error(`Directory ${options.projectDir} does not exist`);
    }

    // Check if git repository exists
    if (!existsSync(join(projectPath, '.git'))) {
      spinner.fail(chalk.red('Not a git repository'));
      throw new Error('Not a git repository');
    }

    // Run tests
    spinner.text = 'Running tests...';
    execSync('bun test', { cwd: projectPath, stdio: 'ignore' });

    // Build project
    spinner.text = 'Building project...';
    execSync('bun run build', { cwd: projectPath, stdio: 'ignore' });

    // Run linter
    spinner.text = 'Running linter...';
    execSync('bun run lint', { cwd: projectPath, stdio: 'ignore' });

    if (!options.dryRun) {
      // Publish to npm
      spinner.text = 'Publishing to npm...';
      execSync('npm publish --access public', { cwd: projectPath, stdio: 'ignore' });
    }

    spinner.succeed(chalk.green(`Project ${options.dryRun ? 'ready to publish' : 'published successfully'}`));
  } catch (error) {
    spinner.fail(chalk.red('Failed to publish project'));
    throw error;
  }
} 