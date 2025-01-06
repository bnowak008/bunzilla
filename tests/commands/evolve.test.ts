import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { join } from 'node:path';
import { existsSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import { evolve } from '../../src/commands/evolve';
import { createTempDir, cleanupTempDir } from '../utils/test-helpers';

describe('Evolve Command', () => {
  let tempDir: string;
  let originalCwd: string;

  beforeEach(async () => {
    tempDir = await createTempDir();
    originalCwd = process.cwd();
    process.chdir(tempDir);
    // Create a basic project directory
    await mkdir(join(tempDir, 'test-project'));
  });

  afterEach(async () => {
    process.chdir(originalCwd);
    await cleanupTempDir(tempDir);
  });

  it('should add features to existing project', async () => {
    await evolve({
      projectDir: 'test-project',
      add: ['api'],
    });

    expect(existsSync(join(tempDir, 'test-project', 'src/routes'))).toBe(true);
  });
}); 