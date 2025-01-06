import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { join } from 'node:path';
import { existsSync } from 'node:fs';
import { readFile, rm, writeFile } from 'node:fs/promises';
import inquirer from 'inquirer';
import { config } from '../../src/commands/config';
import { createTempDir, cleanupTempDir } from '../utils/test-helpers';

vi.mock('inquirer', () => ({
  default: {
    prompt: vi.fn(),
  },
}));

// Mock os.homedir() to use our temp directory
vi.mock('os', () => ({
  homedir: vi.fn(),
}));

describe('Config Command', () => {
  let tempDir: string;
  let originalCwd: string;
  let configDir: string;

  beforeEach(async () => {
    tempDir = await createTempDir();
    originalCwd = process.cwd();
    process.chdir(tempDir);

    // Set up mock config directory
    configDir = join(tempDir, '.bunzilla');
    const { homedir } = await import('os');
    vi.mocked(homedir).mockReturnValue(tempDir);
  });

  afterEach(async () => {
    process.chdir(originalCwd);
    await cleanupTempDir(tempDir);
    vi.clearAllMocks();
  });

  it('should show current configuration', async () => {
    const result = await config({ list: true });
    expect(result).toBeDefined();
    expect(result.defaultTemplate).toBe('utility');
  });

  it('should get specific config value', async () => {
    const result = await config({
      get: 'defaultTemplate',
    });

    expect(result).toBe('utility');
  });

  it('should set configuration values', async () => {
    await config({
      set: 'defaultTemplate',
      value: 'webapp',
    });

    const result = await config({
      get: 'defaultTemplate',
    });

    expect(result).toBe('webapp');
  });

  it('should handle missing configuration values', async () => {
    const result = await config({
      get: 'nonexistentKey',
    });

    expect(result).toBeUndefined();
  });

  it('should validate framework selection', async () => {
    await config({
      set: 'defaultFramework',
      value: 'hono',
    });

    const result = await config({
      get: 'defaultFramework',
    });

    expect(result).toBe('hono');

    await expect(
      config({
        set: 'defaultFramework',
        value: 'invalid-framework',
      })
    ).rejects.toThrow();
  });

  it('should validate frontend selection', async () => {
    await config({
      set: 'defaultFrontend',
      value: 'react',
    });

    const result = await config({
      get: 'defaultFrontend',
    });

    expect(result).toBe('react');

    await expect(
      config({
        set: 'defaultFrontend',
        value: 'invalid-frontend',
      })
    ).rejects.toThrow();
  });

  it('should handle corrupted config file', async () => {
    // Write invalid JSON to config file
    const configFile = join(configDir, 'config.json');
    await rm(configFile, { force: true });
    await writeFile(configFile, 'invalid json');

    const result = await config({
      get: 'defaultTemplate',
    });

    expect(result).toBe('utility');
  });
}); 