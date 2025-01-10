import { CreateOptions } from './types.js';
import { TemplateManager } from '../../utils/template-manager.js';

export async function create(options: CreateOptions): Promise<void> {
  const { name, type } = options;

  if (!name || !type) {
    throw new Error('Missing required options');
  }

  const templateManager = new TemplateManager();
  await templateManager.processTemplate(type, name);
} 