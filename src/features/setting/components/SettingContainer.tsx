import { getSubscriptionStatusAction } from "@/actions/getSubscriptionStatusAction";
import { getCurrentPetAction } from "@/features/home/actions/GetCurrentPetAction";
import { getNotificationSettingsAction } from "@/features/setting/actions/GetNotificationSettingsAction";
import { SettingController } from "./SettingController";

export async function SettingContainer() {
  const [petResult, subscriptionResult, notificationResult] = await Promise.all([
    getCurrentPetAction(),
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
      initialPet={
        petResult.success
          ? { color: petResult.pet.color, name: petResult.pet.name }
          : null
      }
      initialPetError={petResult.success ? undefined : petResult.error}
      isSubscriptionActive={
        subscriptionResult.success && subscriptionResult.status.active
      }
      {...notificationProps}
    />
  );
}
