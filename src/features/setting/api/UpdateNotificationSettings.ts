import { apiFetch } from "@/lib/apiFetch";
import type { NotificationSettings } from "@/features/setting/schemas/notificationSettingsSchema";
import { notificationResponseSchema } from "@/features/setting/schemas/notificationResponseSchema";
import type { PushSubscriptionValues } from "@/lib/webPush";

type UpdateNotificationSettingsValues = NotificationSettings & {
  subscription?: PushSubscriptionValues;
};

export async function updateNotificationSettings(
  token: string,
  values: UpdateNotificationSettingsValues,
) {
  const response = await apiFetch("/notifications", {
    body: JSON.stringify({
      is_all_enabled: values.isAllEnabled,
      is_message_enabled: values.isMessageEnabled,
      is_report_enabled: values.isReportEnabled,
      is_yoyo_enabled: values.isYoyoEnabled,
      ...(values.subscription
        ? { subscription: values.subscription }
        : {}),
    }),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "PUT",
  });

  return notificationResponseSchema.parse(await response.json());
}
