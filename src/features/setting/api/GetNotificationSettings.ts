import { apiFetch } from "@/lib/apiFetch";
import { notificationResponseSchema } from "@/features/setting/schemas/notificationResponseSchema";

export async function getNotificationSettings(token: string) {
  const response = await apiFetch("/notifications", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  return notificationResponseSchema.parse(await response.json());
}
