#!/usr/bin/env node
import { createCLI } from './utils/cli.js';
import { projectTypes } from './types.js';
import { getBanner } from './utils/banner.js';

(async () => {
  try {
    const cli = await createCLI({
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
              description: 'Name of the project (lowercase with optional hyphens)',
              validate: (input: string) => {
                if (!/^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(input)) {
                  return 'Project name must be lowercase, start and end with alphanumeric characters, and may contain hyphens in between';
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

    await cli.run();
  } catch (error) {
    console.error('Failed to run CLI:', error);
    process.exit(1);
  }
})();
