"use server";

import { createNotificationSettings } from "@/features/setting/api/CreateNotificationSettings";
import { createNotificationSettingsSchema } from "@/features/setting/schemas/notificationSettingsSchema";
import { getAuthTokenCookie } from "@/lib/authCookie";
import { ApiError } from "@/lib/apiFetch";
import { logServerError } from "@/lib/serverLogger";

const createFailedMessage = "通知設定を登録できませんでした";
const unauthorizedMessage = "ログインし直してください";

export type CreateNotificationSettingsActionResult =
  | { success: true }
  | { error: string; success: false };

export async function createNotificationSettingsAction(
  values: unknown,
): Promise<CreateNotificationSettingsActionResult> {
  const parsedValues = createNotificationSettingsSchema.safeParse(values);

  if (!parsedValues.success) {
    return { error: createFailedMessage, success: false };
  }

  const token = await getAuthTokenCookie();

  if (!token) {
    return { error: unauthorizedMessage, success: false };
  }

  try {
    await createNotificationSettings(token, parsedValues.data);
    return { success: true };
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      return { error: unauthorizedMessage, success: false };
    }

    logServerError("Create notification settings action failed", error);
    return { error: createFailedMessage, success: false };
  }
}
