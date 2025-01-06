import { join } from 'node:path';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { mkdirSync } from 'node:fs';
import { Config, DEFAULT_CONFIG } from './types';

class ConfigManager {
  private config: Config;
  private configPath: string;

  constructor() {
    const homeDir = process.env.HOME || process.env.USERPROFILE;
    if (!homeDir) {
      throw new Error('Could not find home directory');
    }
    
    const configDir = join(homeDir, '.bunzilla');
    this.configPath = join(configDir, 'config.json');
    
    // Ensure config directory exists
    if (!existsSync(configDir)) {
      mkdirSync(configDir, { recursive: true });
    }
    
    // Load or create config
    this.config = this.loadConfig();
  }

  private loadConfig(): Config {
    if (!existsSync(this.configPath)) {
      return { ...DEFAULT_CONFIG };
    }

    try {
      return JSON.parse(readFileSync(this.configPath, 'utf-8'));
    } catch {
      return { ...DEFAULT_CONFIG };
    }
  }

  private saveConfig(): void {
    writeFileSync(this.configPath, JSON.stringify(this.config, null, 2));
  }

  get(key: string): string | undefined {
    return this.config[key];
  }

  set(key: string, value: string): void {
    this.config[key] = value;
    this.saveConfig();
  }

  delete(key: string): void {
    delete this.config[key];
    this.saveConfig();
  }

  reset(): void {
    this.config = { ...DEFAULT_CONFIG };
    this.saveConfig();
  }

  getAll(): Config {
    return { ...this.config };
  }
}

let configInstance: ConfigManager | null = null;

export function getConfig(): ConfigManager {
  if (!configInstance) {
    configInstance = new ConfigManager();
  }
  return configInstance;
} 