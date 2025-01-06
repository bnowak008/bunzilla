import chalk from 'chalk';
import ora from 'ora';
import { ConfigOptions } from './types';
import { getConfig } from './utils';

export * from './types';

export async function config(options: ConfigOptions): Promise<any> {
  const spinner = ora('Managing configuration...').start();

  try {
    const configManager = getConfig();

    if (options.get) {
      const value = configManager.get(options.get);
      spinner.succeed(chalk.green(`Value for ${options.get}: ${value}`));
      return value;
    }

    if (options.set && options.value) {
      configManager.set(options.set, options.value);
      spinner.succeed(chalk.green(`Set ${options.set} to ${options.value}`));
      return configManager.getAll();
    }

    if (options.list) {
      spinner.succeed(chalk.green('Current configuration:'));
      const config = configManager.getAll();
      console.log(JSON.stringify(config, null, 2));
      return config;
    }

    spinner.fail(chalk.red('No valid operation specified'));
    throw new Error('No valid operation specified');
  } catch (error) {
    spinner.fail(chalk.red('Failed to manage configuration'));
    throw error;
  }
}

export const getConfigManager = getConfig; 