"use server";

import { getNotificationSettings } from "@/features/setting/api/GetNotificationSettings";
import type { NotificationSettings } from "@/features/setting/schemas/notificationSettingsSchema";
import { getAuthTokenCookie } from "@/lib/authCookie";
import { ApiError } from "@/lib/apiFetch";
import { logServerError } from "@/lib/serverLogger";

const getFailedMessage = "通知設定を取得できませんでした";
const unauthorizedMessage = "ログインし直してください";

export type GetNotificationSettingsActionResult =
  | {
      exists: boolean;
      settings?: NotificationSettings;
      success: true;
    }
  | { error: string; success: false };

export async function getNotificationSettingsAction(): Promise<GetNotificationSettingsActionResult> {
  const token = await getAuthTokenCookie();

  if (!token) {
    return { error: unauthorizedMessage, success: false };
  }

  try {
    const notification = await getNotificationSettings(token);

    return {
      exists: true,
      settings: notification.settings,
      success: true,
    };
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return { exists: false, success: true };
    }

    if (error instanceof ApiError && error.status === 401) {
      return { error: unauthorizedMessage, success: false };
    }

    logServerError("Get notification settings action failed", error);
    return { error: getFailedMessage, success: false };
  }
}
