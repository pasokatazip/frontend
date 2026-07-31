"use server";

import { updateNotificationSettings } from "@/features/setting/api/UpdateNotificationSettings";
import { updateNotificationSettingsSchema } from "@/features/setting/schemas/notificationSettingsSchema";
import { getAuthTokenCookie } from "@/lib/authCookie";
import { ApiError } from "@/lib/apiFetch";
import { logServerError } from "@/lib/serverLogger";

const unauthorizedMessage = "ログインし直してください";
const updateFailedMessage = "通知設定を更新できませんでした";

export type UpdateNotificationSettingsActionResult =
  | { success: true }
  | { error: string; success: false };

export async function updateNotificationSettingsAction(
  values: unknown,
): Promise<UpdateNotificationSettingsActionResult> {
  const parsedValues = updateNotificationSettingsSchema.safeParse(values);

  if (!parsedValues.success) {
    return { error: updateFailedMessage, success: false };
  }

  const token = await getAuthTokenCookie();

  if (!token) {
    return { error: unauthorizedMessage, success: false };
  }

  try {
    await updateNotificationSettings(token, parsedValues.data);
    return { success: true };
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      return { error: unauthorizedMessage, success: false };
    }

    logServerError("Update notification settings action failed", error);
    return { error: updateFailedMessage, success: false };
  }
}
