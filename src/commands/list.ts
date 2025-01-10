import chalk from 'chalk';

export async function list() {
  console.log(chalk.bold('\nAvailable templates:\n'));

  const templates = [
    {
      name: 'utility',
      description: 'A minimal setup for a publishable utility package',
      features: [
        'TypeScript configuration',
        'Testing with Vitest',
        'Linting with Biome',
        'Build configuration',
      ],
    },
    {
      name: 'monorepo',
      description: 'A monorepo setup with multiple packages',
      features: [
        'Workspace configuration',
        'Shared configurations',
        'Independent versioning',
        'Build pipeline',
      ],
    },
    {
      name: 'webapp',
      description: 'A modern web application setup',
      features: [
        'Choice of React/Solid/Svelte',
        'TailwindCSS for styling',
        'File-based routing',
        'API integration',
      ],
    },
    {
      name: 'api',
      description: 'A production-ready API setup',
      features: [
        'Choice of Hono/Fastify/Express',
        'OpenAPI documentation',
        'Authentication setup',
        'Database integration',
      ],
    },
    {
      name: 'cli',
      description: 'A command-line interface tool setup',
      features: [
        'Command structure',
        'Interactive prompts',
        'Colorful output',
        'Error handling',
      ],
    },
  ];

  templates.forEach((template) => {
    console.log(chalk.cyan(`${template.name}`));
    console.log(chalk.dim(template.description));
    console.log('\nFeatures:');
    template.features.forEach((feature) => {
      console.log(chalk.dim(`  • ${feature}`));
    });
    console.log(''); // Empty line between templates
  });

  console.log(chalk.bold('\nUsage:\n'));
  console.log(`  ${chalk.cyan('bunzilla create')} ${chalk.dim('[type]')} ${chalk.dim('[options]')}`);
  console.log(`  ${chalk.cyan('bunzilla create utility')} ${chalk.dim('--name my-package')}\n`);
} 
