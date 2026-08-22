import { z } from "zod";

export const createPostSchema = z.object({
  content: z.string().trim().min(1, "つぶやいてください"),
});

export type CreatePostSchema = z.infer<typeof createPostSchema>;
