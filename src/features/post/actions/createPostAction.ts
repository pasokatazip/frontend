"use server";

import { createPost } from "@/features/post/api/CreatePost";
import { createPostSchema } from "@/features/post/schemas/createPostSchema";
import { getAuthTokenCookie } from "@/lib/authCookie";
import { getPetIdFromToken } from "@/lib/authToken";
import { ApiError } from "@/lib/apiFetch";
import { logServerError } from "@/lib/serverLogger";

const createPostFailedMessage = "投稿できませんでした";
const unauthorizedMessage = "ログインし直してください";

export type CreatePostActionResult =
  | { success: true }
  | { error: string; success: false };

export async function createPostAction(
  values: unknown,
): Promise<CreatePostActionResult> {
  const parsedValues = createPostSchema.safeParse(values);

  if (!parsedValues.success) {
    return {
      error: parsedValues.error.issues[0]?.message ?? createPostFailedMessage,
      success: false,
    };
  }

  const token = await getAuthTokenCookie();

  if (!token) {
    return {
      error: unauthorizedMessage,
      success: false,
    };
  }

  const petId = getPetIdFromToken(token);

  if (!petId) {
    return {
      error: createPostFailedMessage,
      success: false,
    };
  }

  try {
    await createPost(token, petId, {
      content: parsedValues.data.content,
    });

    return {
      success: true,
    };
  } catch (error) {
    logServerError("Create post action failed", error);

    if (error instanceof ApiError && error.status === 401) {
      return {
        error: unauthorizedMessage,
        success: false,
      };
    }

    return {
      error: createPostFailedMessage,
      success: false,
    };
  }
}
