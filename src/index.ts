#!/usr/bin/env bun
import { Command } from 'commander';
import { version } from '../package.json';

const program = new Command();

program
  .name('bunzilla')
  .description('A CLI tool for bootstrapping Bun projects with modern development practices')
  .version(version);

// Register commands
program
  .command('create')
  .description('Create a new Bun project')
  .argument('[type]', 'Project type (utility, monorepo, webapp, api, cli)')
  .option('--name <name>', 'Project name')
  .option('--defaults', 'Skip prompts with default values')
  .option('--framework <framework>', 'Specify framework for APIs')
  .option('--frontend <frontend>', 'Specify frontend stack')
  .option('--template <template>', 'Use a custom template')
  .action(async (type, options) => {
    const { create } = await import('./commands/create');
    await create({ name: options.name, type, defaults: options.defaults });
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