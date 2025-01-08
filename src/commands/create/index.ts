import { join } from 'node:path';
import { existsSync } from 'node:fs';
import kleur from 'kleur';
import ora from 'ora';
import { TemplateManager } from '../../utils/template-manager';
import { CreateOptions, ProjectType } from './types';

export async function create(options: CreateOptions): Promise<void> {
  const spinner = ora({ color: 'cyan' });
  const { name, type } = options;

  try {
    if (!name || !type) {
      throw new Error('Missing required options');
    }

    spinner.start('Creating project...');
    const projectDir = join(process.cwd(), name);

    if (existsSync(projectDir)) {
      spinner.fail(kleur.red(`Directory ${name} already exists`));
      throw new Error(`Directory ${name} already exists`);
    }

    const templateManager = new TemplateManager();
    const templatePath = templateManager.getTemplate(type as ProjectType);

    if (!existsSync(templatePath)) {
      spinner.fail(kleur.red(`No template found for type: ${type}`));
      throw new Error(`No template found for type: ${type}`);
    }

    await templateManager.processTemplate(templatePath, projectDir);
    spinner.succeed(kleur.green(`Project ${name} created successfully`));
    
    console.log('\nNext steps:');
    console.log(kleur.cyan(`  cd ${name}`));
    console.log(kleur.cyan('  bun install'));
    console.log(kleur.cyan('  bun run dev'));
  } catch (error) {
    spinner.fail(kleur.red('Failed to create project'));
    if (error instanceof Error) {
      console.error(kleur.red(error.message));
    }
    process.exit(1);
  }
} 