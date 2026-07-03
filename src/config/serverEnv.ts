import { z } from "zod";

const serverEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  PETYOYO_API_URL: z.url(),
});

export function getServerEnv() {
  return serverEnvSchema.parse(process.env);
}
