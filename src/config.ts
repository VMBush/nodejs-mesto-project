import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().transform(Number).default('3000'),
  DATABASE_URL: z.string().url().default('mongodb://localhost:27017/mydb'),
  SECRET_KEY: z.string().default('1234567890'),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  process.exit(1);
}

export default {
  port: parsedEnv.data.PORT,
  databaseUrl: parsedEnv.data.DATABASE_URL,
  secretKey: parsedEnv.data.SECRET_KEY,
};
