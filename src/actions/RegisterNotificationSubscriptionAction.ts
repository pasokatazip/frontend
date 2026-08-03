"use server";

import { createNotificationSettings } from "@/features/setting/api/CreateNotificationSettings";
import { getNotificationSettings } from "@/features/setting/api/GetNotificationSettings";
import { updateNotificationSettings } from "@/features/setting/api/UpdateNotificationSettings";
import { getAuthTokenCookie } from "@/lib/authCookie";
import { ApiError } from "@/lib/apiFetch";
import { pushSubscriptionSchema } from "@/lib/webPush";
import { logServerError } from "@/lib/serverLogger";

const initialSettings = {
  isAllEnabled: true,
  isMessageEnabled: false,
  isReportEnabled: false,
  isYoyoEnabled: true,
};

export type RegisterNotificationSubscriptionActionResult =
  | { success: true }
  | { error: string; success: false };

export async function registerNotificationSubscriptionAction(
  values: unknown,
): Promise<RegisterNotificationSubscriptionActionResult> {
  const subscription = pushSubscriptionSchema.safeParse(values);

  if (!subscription.success) {
    return { error: "通知の購読情報が正しくありません", success: false };
  }

  const token = await getAuthTokenCookie();

  if (!token) {
    return { error: "ログインし直してください", success: false };
  }

  try {
    try {
      const notification = await getNotificationSettings(token);

      await updateNotificationSettings(token, {
        ...notification.settings,
        subscription: subscription.data,
      });
    } catch (error) {
      if (!(error instanceof ApiError) || error.status !== 404) {
        throw error;
      }

      await createNotificationSettings(token, {
        ...initialSettings,
        subscription: subscription.data,
      });
    }

    return { success: true };
  } catch (error) {
    logServerError("Register notification subscription action failed", error);
    return { error: "通知を登録できませんでした", success: false };
  }
}
