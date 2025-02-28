import { createApiClient } from '@${projectName}/shared';

// Create a type-safe API client
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
export const api = createApiClient(apiUrl);

// Example usage:
// const { data } = await api.api.users.get();
// const { data: user } = await api.api.users[userId].get(); 