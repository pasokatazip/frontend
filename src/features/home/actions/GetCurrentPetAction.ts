"use server";

import {
  getCurrentPet,
  type CurrentPet,
} from "@/features/home/api/GetCurrentPet";
import { ApiError } from "@/lib/apiFetch";
import { getAuthTokenCookie } from "@/lib/authCookie";
import { logServerError } from "@/lib/serverLogger";

const getCurrentPetFailedMessage = "ペット情報を取得できませんでした";
const unauthorizedMessage = "ログインし直してください";

export type GetCurrentPetActionResult =
  | { pet: CurrentPet; success: true }
  | { error: string; success: false };

export async function getCurrentPetAction(): Promise<GetCurrentPetActionResult> {
  const token = await getAuthTokenCookie();

  if (!token) {
    return { error: unauthorizedMessage, success: false };
  }

  try {
    const pet = await getCurrentPet(token);

    return { pet, success: true };
  } catch (error) {
    logServerError("Get current pet action failed", error);

    if (error instanceof ApiError && error.status === 401) {
      return { error: unauthorizedMessage, success: false };
    }

    return { error: getCurrentPetFailedMessage, success: false };
  }
}
