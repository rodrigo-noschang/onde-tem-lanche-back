import { config } from 'dotenv';
import { z } from 'zod';

config();

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production']).default('development'),
    DATABASE_URL: z.string(),
    PORT: z.coerce.number().default(3000)
})

const envParse = envSchema.safeParse(process.env);

if (envParse.success === false) {
    throw new Error(JSON.stringify(envParse.error.format()));
}

export const env = envParse.data;