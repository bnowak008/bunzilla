import { join } from 'node:path';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { mkdirSync } from 'node:fs';
import chalk from 'chalk';
import ora from 'ora';
import { ConfigOptions, DEFAULT_CONFIG, Config } from '@/types';

function getConfigPath(): string {
  const homeDir = process.env.HOME || process.env.USERPROFILE;
  if (!homeDir) {
    throw new Error('Could not find home directory');
  }
  return join(homeDir, '.bunzilla', 'config.json');
}

function readConfig(): Config {
  const configPath = getConfigPath();
  if (!existsSync(configPath)) {
    return DEFAULT_CONFIG;
  }
  return JSON.parse(readFileSync(configPath, 'utf-8'));
}

function writeConfig(config: Config): void {
  const configPath = getConfigPath();
  const configDir = join(process.env.HOME || process.env.USERPROFILE!, '.bunzilla');
  
  if (!existsSync(configDir)) {
    mkdirSync(configDir, { recursive: true });
  }
  
  writeFileSync(configPath, JSON.stringify(config, null, 2));
}

export async function config(options: ConfigOptions): Promise<any> {
  const spinner = ora('Managing configuration...').start();

  try {
    const config = readConfig();

    if (options.get) {
      spinner.succeed(chalk.green(`Value for ${options.get}: ${config[options.get]}`));
      return config[options.get];
    }

    if (options.set && options.value) {
      config[options.set] = options.value;
      writeConfig(config);
      spinner.succeed(chalk.green(`Set ${options.set} to ${options.value}`));
      return config;
    }

    if (options.list) {
      spinner.succeed(chalk.green('Current configuration:'));
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

export const getConfig = () => readConfig();
