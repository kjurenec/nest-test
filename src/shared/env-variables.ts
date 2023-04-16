import z from 'zod';

export type EnvVariables = z.infer<typeof envVariablesSchema>;

export const envVariablesSchema = z.object({
  JWT_SECRET: z.string(),
  JWT_EXPIRATION_TIME: z.number({ coerce: true }),
});
