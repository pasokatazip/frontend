"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useNotificationSettings } from "@/features/setting/hooks/useNotificationSettings";
import type { NotificationSettings } from "@/features/setting/schemas/notificationSettingsSchema";
import { updatePetProfileAction } from "@/features/setting/actions/UpdatePetProfileAction";
import { colorCodeToHueRotate } from "@/utils/colorCodeToHueRotate";
import { hueRotateToColorCode } from "@/utils/hueRotateToColorCode";
import { SettingView } from "./SettingView";

type SettingControllerProps = {
  initialPet: { color: string; name: string } | null;
  initialPetError?: string;
  initialNotificationError?: string;
  initialNotificationSettings?: NotificationSettings;
  initiallyNotificationRegistered: boolean;
  isSubscriptionActive: boolean;
};

export function SettingController({
  initialPet,
  initialPetError,
  initialNotificationError,
  initialNotificationSettings,
  initiallyNotificationRegistered,
  isSubscriptionActive,
}: SettingControllerProps) {
  const router = useRouter();
  const initialHue = initialPet ? colorCodeToHueRotate(initialPet.color) : 0;
  const [hue, setHue] = useState(initialHue);
  const [petName, setPetName] = useState(initialPet?.name ?? "ペット名");
  const [isPetSaving, setIsPetSaving] = useState(false);
  const [petProfileError, setPetProfileError] = useState(initialPetError);
  const notificationSettings = useNotificationSettings({
    initialError: initialNotificationError,
    initiallyRegistered: initiallyNotificationRegistered,
    initialSettings: initialNotificationSettings,
    onSaved() {
      router.replace("/Home");
    },
  });

  async function handleSave() {
    const hasPetProfileChanges =
      initialPet !== null &&
      (petName !== initialPet.name || hue !== initialHue);

    if (isSubscriptionActive && hasPetProfileChanges) {
      setIsPetSaving(true);
      setPetProfileError(undefined);

      try {
        const result = await updatePetProfileAction({
          color:
            hue === initialHue ? initialPet.color : hueRotateToColorCode(hue),
          name: petName,
        });

        if (!result.success) {
          setPetProfileError(result.error);
          return;
        }
      } catch {
        setPetProfileError("ペットの設定を変更できませんでした");
        return;
      } finally {
        setIsPetSaving(false);
      }
    }

    await notificationSettings.onSave();
  }

  return (
    <SettingView
      hue={hue}
      isSaving={isPetSaving || notificationSettings.isSaving}
      isSubscriptionActive={isSubscriptionActive}
      isPetProfileAvailable={initialPet !== null}
      notificationError={
        petProfileError ?? notificationSettings.notificationError
      }
      notificationSettings={notificationSettings.notificationSettings}
      onHueChange={setHue}
      onNameChange={setPetName}
      onNotificationEnabledChange={
        notificationSettings.onNotificationEnabledChange
      }
      onNotificationSettingsChange={
        notificationSettings.onNotificationSettingsChange
      }
      onSave={handleSave}
      petName={petName}
    />
  );
}
