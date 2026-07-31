import { getSubscriptionStatusAction } from "@/actions/getSubscriptionStatusAction";
import { getNotificationSettingsAction } from "@/features/setting/actions/GetNotificationSettingsAction";
import { SettingController } from "./SettingController";

export async function SettingContainer() {
  const [subscriptionResult, notificationResult] = await Promise.all([
    getSubscriptionStatusAction(),
    getNotificationSettingsAction(),
  ]);
  const notificationProps = notificationResult.success
    ? {
        ...(notificationResult.settings
          ? { initialNotificationSettings: notificationResult.settings }
          : {}),
        initiallyNotificationRegistered: notificationResult.exists,
      }
    : {
        initialNotificationError: notificationResult.error,
        initiallyNotificationRegistered: false,
      };

  return (
    <SettingController
      isSubscriptionActive={
        subscriptionResult.success && subscriptionResult.status.active
      }
      {...notificationProps}
    />
  );
}
