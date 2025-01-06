#!/usr/bin/env bun
import { Command } from 'commander';
import chalk from 'chalk';
import { version } from '../package.json';
import { getBanner } from './utils/banner';

const program = new Command();

// Always show banner
console.log(chalk.yellow(getBanner()));

program
  .name('bunzilla')
  .description('A CLI tool for bootstrapping Bun projects with modern development practices')
  .version(version);

// Register commands
program
  .command('create')
  .description('Create a new Bun project')
  .argument('[name]', 'Project name')
  .option('--type <type>', 'Project type (utility, monorepo, webapp, api, cli)')
  .option('--frontend <frontend>', 'Specify frontend stack')
  .option('--framework <framework>', 'Specify framework for APIs')
  .option('--defaults', 'Skip prompts with default values')
  .action(async (name, options) => {
    const { create } = await import('./commands/create');
    await create({ ...options, name });
  });

program
  .command('list')
  .description('List all available templates')
  .action(async () => {
    const { list } = await import('./commands/list');
    await list();
  });

program
  .command('evolve')
  .description('Add features to an existing project')
  .option('--add <feature>', 'Add a specific feature')
  .option('--convert <type>', 'Convert project to a different type')
  .action(async (options) => {
    const { evolve } = await import('./commands/evolve');
    await evolve(options);
  });

program
  .command('publish')
  .description('Automate the publishing workflow')
  .action(async () => {
    const { publish } = await import('./commands/publish');
    await publish({ projectDir: process.cwd() });
  });

program
  .command('config')
  .description('View or edit global configurations')
  .action(async () => {
    const { config } = await import('./commands/config');
    await config({});
  });

program.parse(); 