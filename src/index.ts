#!/usr/bin/env node
import { createCLI } from './utils/cli.js';
import { projectTypes, webappFrameworks, apiFrameworks } from './types.js';
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
              description: 'Name of the project',
              validate: (input: string) => {
                if (!/^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(input)) {
                  return 'Project name must be lowercase, start and end with alphanumeric characters, and may contain hyphens in between';
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
            },
            {
              name: 'packages',
              type: 'select',
              message: 'Select packages to include:',
              description: 'Packages to include in monorepo',
              choices: [
                { title: 'All (Frontend + Backend + Shared)', value: 'all' },
                { title: 'Frontend Only', value: 'frontend' },
                { title: 'Backend Only', value: 'backend' },
                { title: 'Custom Selection', value: 'custom' }
              ],
              when: (answers) => answers.type === 'monorepo'
            },
            {
              name: 'frontend',
              type: 'select',
              message: 'Select frontend framework:',
              description: 'Frontend framework to use',
              choices: webappFrameworks,
              when: (answers) => 
                answers.type === 'webapp' || 
                (answers.type === 'monorepo' && 
                 (answers.packages === 'all' || 
                  answers.packages === 'frontend' || 
                  answers.packages === 'custom'))
            },
            {
              name: 'framework',
              type: 'select',
              message: 'Select API framework:',
              description: 'API framework to use',
              choices: apiFrameworks,
              when: (answers) => 
                answers.type === 'api' || 
                (answers.type === 'monorepo' && 
                 (answers.packages === 'all' || 
                  answers.packages === 'backend' || 
                  answers.packages === 'custom'))
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
