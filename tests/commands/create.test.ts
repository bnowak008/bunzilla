import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { join } from 'node:path';
import { existsSync } from 'node:fs';
import { readFile, mkdir } from 'node:fs/promises';
import inquirer from 'inquirer';
import { create } from '../../src/commands/create';
import { createTempDir, cleanupTempDir, mockProcessExit } from '../utils/test-helpers';

vi.mock('inquirer', () => ({
  default: {
    prompt: vi.fn(),
  },
}));

describe('Create Command', () => {
  let tempDir: string;
  let originalCwd: string;

  beforeEach(async () => {
    tempDir = await createTempDir();
    originalCwd = process.cwd();
    process.chdir(tempDir);
  });

  afterEach(async () => {
    process.chdir(originalCwd);
    await cleanupTempDir(tempDir);
    vi.clearAllMocks();
  });

  it('should create a utility project with default options', async () => {
    const projectName = 'test-utility';
    await create({
      name: projectName,
      type: 'utility',
      defaults: true,
    });

    // Check if project directory was created
    const projectDir = join(tempDir, projectName);
    expect(existsSync(projectDir)).toBe(true);

    // Check if key files exist
    expect(existsSync(join(projectDir, 'src/index.ts'))).toBe(true);
    expect(existsSync(join(projectDir, 'tests/index.test.ts'))).toBe(true);
    expect(existsSync(join(projectDir, 'tsconfig.json'))).toBe(true);
    expect(existsSync(join(projectDir, 'biome.json'))).toBe(true);
    expect(existsSync(join(projectDir, 'package.json'))).toBe(true);

    // Verify package.json content
    const packageJson = JSON.parse(await readFile(join(projectDir, 'package.json'), 'utf-8'));
    expect(packageJson.name).toBe(projectName);
    expect(packageJson.type).toBe('module');
  });

  it('should create a webapp project with specified frontend', async () => {
    const projectName = 'test-webapp';
    await create({
      name: projectName,
      type: 'webapp',
      defaults: true,
      frontend: 'react',
    });

    const projectDir = join(tempDir, projectName);
    expect(existsSync(projectDir)).toBe(true);

    // Check for React-specific files
    expect(existsSync(join(projectDir, 'src/App.tsx'))).toBe(true);
    expect(existsSync(join(projectDir, 'src/main.tsx'))).toBe(true);
    expect(existsSync(join(projectDir, 'index.html'))).toBe(true);

    // Verify package.json content
    const packageJson = JSON.parse(await readFile(join(projectDir, 'package.json'), 'utf-8'));
    expect(packageJson.dependencies.react).toBeDefined();
    expect(packageJson.dependencies['react-dom']).toBeDefined();
  });

  it('should create an API project with specified framework', async () => {
    const projectName = 'test-api';
    await create({
      name: projectName,
      type: 'api',
      defaults: true,
      framework: 'hono',
    });

    const projectDir = join(tempDir, projectName);
    expect(existsSync(projectDir)).toBe(true);

    // Check for API-specific files
    expect(existsSync(join(projectDir, 'src/index.ts'))).toBe(true);
    expect(existsSync(join(projectDir, 'src/routes'))).toBe(true);
    expect(existsSync(join(projectDir, '.env.example'))).toBe(true);

    // Verify package.json content
    const packageJson = JSON.parse(await readFile(join(projectDir, 'package.json'), 'utf-8'));
    expect(packageJson.dependencies.hono).toBeDefined();
  });

  it('should fail when directory already exists', async () => {
    const projectName = 'existing-project';
    // Create the directory first
    const projectDir = join(tempDir, projectName);
    await mkdir(projectDir);

    const mockExit = mockProcessExit();

    await expect(create({
      name: projectName,
      type: 'utility',
      defaults: true,
    })).rejects.toThrow();
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  it('should prompt for missing options when defaults is false', async () => {
    const projectName = 'prompt-project';
    const mockPrompt = vi.spyOn(inquirer, 'prompt');
    mockPrompt.mockResolvedValueOnce({
      name: projectName,
      type: 'utility',
    });

    await create({
      defaults: false,
    });

    expect(mockPrompt).toHaveBeenCalled();
    const projectDir = join(tempDir, projectName);
    expect(existsSync(projectDir)).toBe(true);
  });
}); 