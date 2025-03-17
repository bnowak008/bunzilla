import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
import * as schema from './schema';

// Create SQLite database instance
const sqlite = new Database('sqlite.db');

// Create Drizzle ORM instance with our schema
export const db = drizzle(sqlite, { schema });

// Export the schema for use in other files
export { schema }; 