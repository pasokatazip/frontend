"use server";

import {
  getEvolutionStatus,
  type EvolutionStatus,
} from "@/features/home/api/GetEvolutionStatus";
import { ApiError } from "@/lib/apiFetch";
import { getAuthTokenCookie } from "@/lib/authCookie";
import { logServerError } from "@/lib/serverLogger";

const getEvolutionStatusFailedMessage = "進化情報を取得できませんでした";
const unauthorizedMessage = "ログインし直してください";

export type GetEvolutionStatusActionResult =
  | { status: EvolutionStatus; success: true }
  | { error: string; success: false };

export async function getEvolutionStatusAction(): Promise<GetEvolutionStatusActionResult> {
  const token = await getAuthTokenCookie();

  if (!token) {
    return { error: unauthorizedMessage, success: false };
  }

  try {
    const status = await getEvolutionStatus(token);

    return { status, success: true };
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      return { error: unauthorizedMessage, success: false };
    }

    logServerError("Get evolution status action failed", error);

    return { error: getEvolutionStatusFailedMessage, success: false };
  }
}
