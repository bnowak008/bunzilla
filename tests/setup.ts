import { vi } from 'vitest';
import { join } from 'node:path';

// Mock process.cwd() to return a consistent path
vi.spyOn(process, 'cwd').mockReturnValue('/test/workspace');

// Mock process.exit to throw instead of exiting
vi.spyOn(process, 'exit').mockImplementation((code?: number | string | null | undefined) => {
  throw new Error(`Process.exit called with code: ${code}`);
});

// Mock console methods to avoid noise in test output
vi.spyOn(console, 'log').mockImplementation(() => {});
vi.spyOn(console, 'error').mockImplementation(() => {});
vi.spyOn(console, 'warn').mockImplementation(() => {});

// Set up environment variables
process.env.NODE_ENV = 'test'; 