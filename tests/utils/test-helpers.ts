import { mkdtemp, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { vi } from 'vitest';
import { ProjectType } from '../../src/types';

export async function createTempDir(): Promise<string> {
  return await mkdtemp(join(tmpdir(), 'bunzilla-test-'));
}

export async function cleanupTempDir(dir: string): Promise<void> {
  await rm(dir, { recursive: true, force: true });
}

export function mockProcessExit() {
  const mockExit = vi.spyOn(process, 'exit').mockImplementation(() => undefined as never);
  return mockExit;
}

// Mock the template directory path for tests
vi.mock('../../src/utils/template-manager', () => {
  const { join } = require('node:path');
  return {
    TemplateManager: class {
      getTemplate(type: ProjectType) {
        return join(__dirname, '..', '..', 'src', 'templates', type);
      }
      async processTemplate(templatePath: string, targetDir: string) {
        const { cp } = require('node:fs/promises');
        await cp(templatePath, targetDir, { recursive: true });
      }
    },
  };
}); 