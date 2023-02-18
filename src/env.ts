// -- BerniiBot --
// Environment variables
import dotenv from 'dotenv'
import { z, ZodFormattedError } from 'zod'
if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
}

const formatErrors = (errors: ZodFormattedError<Map<string, string>, string>) =>
    Object.entries(errors)
        .map(([name, value]) => {
            if (value && '_errors' in value) return `${name}: ${value._errors.join(', ')}\n`
        })
        .filter(Boolean)

const schema = z.object({
    // Node specific
    NODE_ENV: z.enum(['development', 'production']).default('development'),
    // Token
    TOKEN: z.string(),
    // Server settings
    SERVER_ID: z.string(),
    REACTION_MESSAGE_ID: z.string(),
    PREFIX: z.string(),
    // Role settings
    RED_ROLE_ID: z.string(),
    GREEN_ROLE_ID: z.string(),
    BLUE_ROLE_ID: z.string()
})

const _env = schema.safeParse(process.env)
if (!_env.success) {
    console.error('[X] Invalid environment variables:\n', ...formatErrors(_env.error.format()))
    throw new Error('Invalid environment variables!')
}

export const env = _env.data
