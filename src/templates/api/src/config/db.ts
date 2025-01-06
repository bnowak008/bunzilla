import { drizzle } from 'drizzle-orm/neon-serverless';
import { neon } from '@neondatabase/serverless';
import { env } from './env';
import * as schema from '../db/schema';

const sql = neon(env.DATABASE_URL);
export const db = drizzle(sql, { schema });