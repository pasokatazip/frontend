"use server";

import { getAuthTokenCookie } from "@/features/auth/lib/authCookie";
import { startSubscriptionCheckout } from "@/features/subscription/api/StartSubscriptionCheckout";
import { ApiError } from "@/lib/apiFetch";
import { logServerError } from "@/lib/serverLogger";

const checkoutFailedMessage = "決済を開始できませんでした";
const alreadySubscribedMessage = "すでに機能は解放されています";
const unauthorizedMessage = "ログインし直してください";

export type StartSubscriptionCheckoutActionResult =
  | { checkoutUrl: string; success: true }
  | { error: string; success: false };

export async function startSubscriptionCheckoutAction(): Promise<StartSubscriptionCheckoutActionResult> {
  const token = await getAuthTokenCookie();

  if (!token) {
    return { error: checkoutFailedMessage, success: false };
  }

  try {
    const checkoutUrl = await startSubscriptionCheckout(token);

    return { checkoutUrl, success: true };
  } catch (error) {
    logServerError("Start subscription checkout action failed", error);

    if (error instanceof ApiError) {
      if (error.status === 401) {
        return { error: unauthorizedMessage, success: false };
      }

      if (error.status === 409) {
        return { error: alreadySubscribedMessage, success: false };
      }
    }

    return { error: checkoutFailedMessage, success: false };
  }
}
