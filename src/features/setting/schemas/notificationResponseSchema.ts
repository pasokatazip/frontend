import { z } from "zod";

export const notificationResponseSchema = z
  .object({
    id: z.string().min(1),
    is_all_enabled: z.boolean(),
    is_message_enabled: z.boolean(),
    is_report_enabled: z.boolean(),
    is_yoyo_enabled: z.boolean(),
  })
  .transform((notification) => ({
    id: notification.id,
    settings: {
      isAllEnabled: notification.is_all_enabled,
      isMessageEnabled: notification.is_message_enabled,
      isReportEnabled: notification.is_report_enabled,
      isYoyoEnabled: notification.is_yoyo_enabled,
    },
  }));
