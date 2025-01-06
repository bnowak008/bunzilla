import { z } from 'zod';
import { config } from 'dotenv';

config();

const envSchema = z.object({
  PORT: z.string().default('3000'),
  HOST: z.string().default('localhost'),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);