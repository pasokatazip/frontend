import { z } from "zod";

export const createPostSchema = z.object({
  content: z.string().trim().min(1, "投稿内容を入力してください"),
});

export type CreatePostSchema = z.infer<typeof createPostSchema>;
