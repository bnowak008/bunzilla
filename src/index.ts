#!/usr/bin/env bun
import { createCLI, type CLIConfig } from './utils/cli';
import { projectTypes } from './types';
import { getBanner } from './utils/banner';

const cli = createCLI({
  name: 'bunzilla',
  version: '0.0.1',
  commands: {
    create: {
      name: 'create',
      description: 'Create a new Bun project',
      banner: {
        render: getBanner,
        text: 'The Ultimate Bun Project Generator',
        responsive: true
      },
      steps: [
        {
          name: 'name',
          type: 'text',
          message: 'Project name: ',
          description: 'Name of the project',
          validate: (input: string) => {
            if (!/^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(input)) {
              return 'Project name must start and end with alphanumeric characters and may contain hyphens in between';
            }
            if (input.length < 2) {
              return 'Project name must be at least 2 characters long';
            }
            return true;
          }
        },
        {
          name: 'type',
          type: 'select',
          message: 'Select project type:',
          description: 'Type of project to create',
          choices: projectTypes
        }
      ]
    },
    evolve: {
      name: 'evolve',
      description: 'Add features to an existing project',
      banner: {
        render: getBanner,
        text: 'The Ultimate Bun Project Generator',
        responsive: true
      },
      steps: [
        {
          name: 'feature',
          type: 'select',
          message: 'Select feature to add:',
          description: 'Feature to add to the project',
          choices: [
            { title: 'Add CLI Interface', value: 'cli' },
            { title: 'Add Frontend', value: 'frontend' },
            { title: 'Add API', value: 'api' }
          ]
        }
      ]
    },
    config: {
      name: 'config',
      description: 'View or edit global configurations',
      banner: {
        render: getBanner,
        text: 'The Ultimate Bun Project Generator',
        responsive: true
      },
      steps: [
        {
          name: 'action',
          type: 'select',
          message: 'Select configuration action:',
          description: 'Configuration action to perform',
          choices: [
            { title: 'View Current Config', value: 'view' },
            { title: 'Edit Config', value: 'edit' }
          ]
        }
      ]
    }
  }
});

cli.run();
