"use server";

import { getAuthTokenCookie } from "@/lib/authCookie";
import { ApiError } from "@/lib/apiFetch";
import { logServerError } from "@/lib/serverLogger";
import {
  getSubscriptionStatus,
  type SubscriptionStatus,
} from "@/lib/subscriptionStatus";

const subscriptionStatusFailedMessage = "契約状態を確認できませんでした";
const unauthorizedMessage = "ログインし直してください";

export type GetSubscriptionStatusActionResult =
  | { status: SubscriptionStatus; success: true }
  | { error: string; success: false };

export async function getSubscriptionStatusAction(): Promise<GetSubscriptionStatusActionResult> {
  const token = await getAuthTokenCookie();

  if (!token) {
    return { error: unauthorizedMessage, success: false };
  }

  try {
    const status = await getSubscriptionStatus(token);

    return { status, success: true };
  } catch (error) {
    logServerError("Get subscription status action failed", error);

    if (error instanceof ApiError && error.status === 401) {
      return { error: unauthorizedMessage, success: false };
    }

    return { error: subscriptionStatusFailedMessage, success: false };
  }
}
