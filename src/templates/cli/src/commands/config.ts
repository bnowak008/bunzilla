import chalk from 'chalk';
import { getConfig } from '../utils/config';

interface ConfigOptions {
  get?: string;
  set?: string;
  delete?: string;
  list?: boolean;
}

export function configCommand(options: ConfigOptions) {
  const config = getConfig();

  try {
    if (options.list) {
      const allConfig = config.store;
      console.log(chalk.bold('\nCurrent configuration:\n'));
      Object.entries(allConfig).forEach(([key, value]) => {
        console.log(chalk.cyan(key + ':'), value);
      });
      return;
    }

    if (options.get) {
      const value = config.get(options.get);
      if (value === undefined) {
        console.log(chalk.yellow(`No configuration found for '${options.get}'`));
      } else {
        console.log(value);
      }
      return;
    }

    if (options.set) {
      const [key, value] = options.set.split(' ');
      config.set(key, value);
      console.log(chalk.green(`Configuration '${key}' set to '${value}'`));
      return;
    }

    if (options.delete) {
      config.delete(options.delete);
      console.log(chalk.green(`Configuration '${options.delete}' deleted`));
      return;
    }

    // If no options provided, show help
    console.log(chalk.yellow('Please provide an option. Use --help for usage information.'));
  } catch (error) {
    console.error(chalk.red('Error managing configuration:'), error);
    process.exit(1);
  }
}