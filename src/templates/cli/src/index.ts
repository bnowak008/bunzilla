#!/usr/bin/env bun
import { Command } from 'commander';
import updateNotifier from 'update-notifier';
import { version } from '../package.json';
import { initCommand } from './commands/init';
import { configCommand } from './commands/config';

// Check for updates
updateNotifier({ pkg: { name: '${projectName}', version } }).notify();

const program = new Command();

program
  .name('${projectName}')
  .description('A modern command-line tool')
  .version(version);

// Register commands
program
  .command('init')
  .description('Initialize a new project')
  .option('-n, --name <name>', 'Project name')
  .option('-t, --type <type>', 'Project type')
  .option('-d, --defaults', 'Use default options')
  .action(initCommand);

program
  .command('config')
  .description('Manage configuration')
  .option('-g, --get <key>', 'Get config value')
  .option('-s, --set <key> <value>', 'Set config value')
  .option('-d, --delete <key>', 'Delete config value')
  .option('-l, --list', 'List all config values')
  .action(configCommand);

program.parse();