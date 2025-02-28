export interface User {
  id: string;
  name: string;
  email: string;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export const API_VERSION = '1.0.0';

// Re-export Eden client
export * from './eden-client';
export * from './eden-types';