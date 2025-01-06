import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import { getConfig } from '../utils/config';

interface InitOptions {
  name?: string;
  type?: string;
  defaults?: boolean;
}

export async function initCommand(options: InitOptions) {
  const config = getConfig();
  const spinner = ora('Initializing project...').start();

  try {
    // Get project details
    const answers = options.defaults
      ? {
          name: options.name || 'my-project',
          type: options.type || config.get('defaultType') || 'basic',
        }
      : await promptForDetails(options);

    // TODO: Initialize project with selected options
    spinner.succeed(chalk.green(`Successfully initialized ${answers.name}`));

    // Show next steps
    console.log('\nNext steps:');
    console.log(chalk.cyan(`  cd ${answers.name}`));
    console.log(chalk.cyan('  bun install'));
    console.log(chalk.cyan('  bun dev'));
  } catch (error) {
    spinner.fail(chalk.red('Failed to initialize project'));
    console.error(error);
    process.exit(1);
  }
}

async function promptForDetails(options: InitOptions) {
  const questions = [];

  if (!options.name) {
    questions.push({
      type: 'input',
      name: 'name',
      message: 'What is the name of your project?',
      validate: (input: string) => {
        if (/^[a-z0-9-]+$/.test(input)) return true;
        return 'Project name may only include lowercase letters, numbers, and hyphens';
      },
    });
  }

  if (!options.type) {
    questions.push({
      type: 'list',
      name: 'type',
      message: 'What type of project would you like to create?',
      choices: ['basic', 'advanced', 'custom'],
    });
  }

  const answers = await inquirer.prompt(questions);

  return {
    name: options.name || answers.name,
    type: options.type || answers.type,
  };
}