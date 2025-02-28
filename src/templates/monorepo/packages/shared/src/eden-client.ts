import { edenTreaty } from '@elysiajs/eden';
import type { App } from '@${projectName}/api/src/index';
import type { EdenClient, Treaty } from './eden-types';

/**
 * Creates a type-safe API client for the Elysia backend
 * @param baseUrl The base URL of the API server
 * @returns A type-safe API client
 */
export const createApiClient = (baseUrl: string = 'http://localhost:3000'): EdenClient => {
  return edenTreaty<App>(baseUrl);
};

/**
 * Creates a treaty function that can be used to create API clients
 * @param baseUrl The base URL of the API server
 * @returns A treaty function
 */
export const createTreaty = (baseUrl: string = 'http://localhost:3000'): Treaty => {
  return () => createApiClient(baseUrl);
}; 