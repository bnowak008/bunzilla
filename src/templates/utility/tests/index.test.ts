import { describe, it, expect } from 'vitest';
import { greet } from '../src';

describe('Utility', () => {
  it('should greet correctly', () => {
    expect(greet('World')).toBe('Hello, World!');
  });
});