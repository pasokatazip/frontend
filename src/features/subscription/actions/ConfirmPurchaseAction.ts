"use server";

import { confirmPurchase } from "@/features/subscription/api/ConfirmPurchase";
import { refreshAuthToken } from "@/features/auth/api/RefreshAuthToken";
import { ApiError } from "@/lib/apiFetch";
import { getAuthTokenCookie, setAuthTokenCookie } from "@/lib/authCookie";
import { logServerError } from "@/lib/serverLogger";

const confirmFailedMessage = "決済を確認できませんでした";
const unauthorizedMessage = "ログインし直してください";

export type ConfirmPurchaseActionResult =
  | { active: boolean; success: true }
  | { error: string; success: false };

export async function confirmPurchaseAction(): Promise<ConfirmPurchaseActionResult> {
  const token = await getAuthTokenCookie();

  if (!token) {
    return { error: unauthorizedMessage, success: false };
  }

  try {
    const active = await confirmPurchase(token);

    if (active) {
      const refreshedToken = await refreshAuthToken(token);
      await setAuthTokenCookie(refreshedToken);
    }

    return { active, success: true };
  } catch (error) {
    logServerError("Confirm purchase action failed", error);

    if (error instanceof ApiError && error.status === 401) {
      return { error: unauthorizedMessage, success: false };
    }

    return { error: confirmFailedMessage, success: false };
  }
}
