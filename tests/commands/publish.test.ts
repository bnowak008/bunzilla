import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { publish } from '../../src/commands/publish';
import { cleanupTempDir, createTempDir } from '../utils/test-helpers';

describe('Publish Command', () => {
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

  it('should publish project', async () => {
    await expect(
      publish({
        projectDir: 'test-project',
      })
    ).resolves.not.toThrow();
  });
});
