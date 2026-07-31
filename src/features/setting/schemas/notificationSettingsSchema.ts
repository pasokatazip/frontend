import { z } from "zod";
import { pushSubscriptionSchema } from "@/lib/webPush";

export const notificationSettingsSchema = z.object({
  isAllEnabled: z.boolean(),
  isMessageEnabled: z.boolean(),
  isReportEnabled: z.boolean(),
  isYoyoEnabled: z.boolean(),
});

export const createNotificationSettingsSchema =
  notificationSettingsSchema.extend({
    subscription: pushSubscriptionSchema,
  });

export const updateNotificationSettingsSchema =
  notificationSettingsSchema.extend({
    subscription: pushSubscriptionSchema.optional(),
  });

export type NotificationSettings = z.infer<
  typeof notificationSettingsSchema
>;
