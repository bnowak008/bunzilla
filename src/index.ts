#!/usr/bin/env bun
import { Command } from 'commander';
import { version } from '../package.json';
import { createCLI } from './utils/cli';
import { bunzilla } from './utils/banner';
import { projectTypes, type CLISteps } from './types';
import { getBanner } from './utils/banner';

const program = new Command();

const cliConfig = {
  banner: {
    render: getBanner,
    text: 'The Ultimate Bun Project Generator',
    responsive: true
  },
  steps: {
    create: [
      {
        name: 'name',
        type: 'text' as const,
        message: 'Project name: ',
        validate: (input: string) => {
          if (/^[a-z0-9-]+$/.test(input)) return true;
          return 'Project name may only include lowercase letters, numbers, and hyphens';
        }
      },
      {
        name: 'type',
        type: 'select' as const,
        message: 'Select project type:',
        choices: projectTypes
      }
    ],
    evolve: [
      {
        name: 'feature',
        type: 'select' as const,
        message: 'Select feature to add:',
        choices: [
          { title: 'Add CLI Interface', value: 'cli' },
          { title: 'Add Frontend', value: 'frontend' },
          { title: 'Add API', value: 'api' }
        ]
      }
    ],
    config: [
      {
        name: 'action',
        type: 'select' as const,
        message: 'Select configuration action:',
        choices: [
          { title: 'View Current Config', value: 'view' },
          { title: 'Edit Config', value: 'edit' }
        ]
      }
    ]
  } satisfies CLISteps
};

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
    const cli = await createCLI({
      ...cliConfig,
      steps: cliConfig.steps.create.map(step => ({
        ...step,
        initial: step.name === 'name' ? name : options[step.name]
      }))
    });
    await create({ ...options, ...cli });
  });

program
  .command('evolve')
  .description('Add features to an existing project')
  .option('--add <feature>', 'Add a specific feature')
  .option('--convert <type>', 'Convert project to a different type')
  .action(async (options) => {
    const { evolve } = await import('./commands/evolve');
    const cli = await createCLI({
      ...cliConfig,
      steps: cliConfig.steps.evolve.map(step => ({
        ...step,
        initial: options[step.name]
      }))
    });
    await evolve({ ...options, ...cli });
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
    const cli = await createCLI({
      ...cliConfig,
      steps: cliConfig.steps.config.map(step => ({
        ...step,
        initial: step.name === 'action' ? 'view' : undefined
      }))
    });
    await config({ ...cli });
  });

program.parse(); 