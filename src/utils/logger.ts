import chalk from 'chalk';

export const logger = {
  info: (message: string) => console.log(chalk.blue('ℹ'), message),
  success: (message: string) => console.log(chalk.green('✓'), message),
  warning: (message: string) => console.log(chalk.yellow('⚠'), message),
  error: (message: string, error?: unknown) => {
    console.error(chalk.red('✖'), message);
    if (error instanceof Error) {
      console.error(chalk.dim(error.stack));
    } else if (error) {
      console.error(chalk.dim(String(error)));
    }
  },
  debug: (message: string, ...args: unknown[]) => {
    if (process.env.DEBUG) {
      console.log(chalk.gray('🐛'), message, ...args);
    }
  },
};
