"use server";

import { getAuthTokenCookie } from "@/lib/authCookie";
import { getSubscriptionActiveFromToken } from "@/lib/authToken";

const unauthorizedMessage = "ログインし直してください";

export type GetSubscriptionStatusActionResult =
  | { status: { active: boolean }; success: true }
  | { error: string; success: false };

export async function getSubscriptionStatusAction(): Promise<GetSubscriptionStatusActionResult> {
  const token = await getAuthTokenCookie();

  if (!token) {
    return { error: unauthorizedMessage, success: false };
  }

  return {
    status: {
      active: getSubscriptionActiveFromToken(token),
    },
    success: true,
  };
}
