import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, vi } from 'vitest';

let tempDir: string;

beforeEach(async () => {
  tempDir = await mkdtemp(join(tmpdir(), 'bunzilla-test-'));
  process.chdir(tempDir);

  // Mock console methods to avoid noise in test output
  vi.spyOn(console, 'log').mockImplementation(() => {});
  vi.spyOn(console, 'error').mockImplementation(() => {});
  vi.spyOn(console, 'warn').mockImplementation(() => {});
});

afterEach(async () => {
  await rm(tempDir, { recursive: true, force: true });
  vi.clearAllMocks();
});

// Set up environment variables
process.env.NODE_ENV = 'test';
