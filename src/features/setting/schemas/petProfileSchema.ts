import { z } from "zod";

export const petProfileSchema = z.object({
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  name: z.string().trim().min(1).max(30),
});
