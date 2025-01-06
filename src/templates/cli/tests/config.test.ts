import { describe, it, expect } from 'vitest';
import { configCommand } from '../src/commands/config';
import { getConfig } from '../src/utils/config';

describe('Config Command', () => {
  it('should set and get config value', () => {
    const config = getConfig();
    
    // Set value
    configCommand({ set: 'testKey testValue' });
    expect(config.get('testKey')).toBe('testValue');

    // Get value
    configCommand({ get: 'testKey' });
    expect(config.get('testKey')).toBe('testValue');

    // Clean up
    config.delete('testKey');
  });

  it('should delete config value', () => {
    const config = getConfig();
    
    // Set and then delete value
    config.set('testKey', 'testValue');
    configCommand({ delete: 'testKey' });
    expect(config.get('testKey')).toBeUndefined();
  });
});