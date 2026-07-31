"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useNotificationSettings } from "@/features/setting/hooks/useNotificationSettings";
import type { NotificationSettings } from "@/features/setting/schemas/notificationSettingsSchema";
import { SettingView } from "./SettingView";

type SettingControllerProps = {
  initialNotificationError?: string;
  initialNotificationSettings?: NotificationSettings;
  initiallyNotificationRegistered: boolean;
  isSubscriptionActive: boolean;
};

export function SettingController({
  initialNotificationError,
  initialNotificationSettings,
  initiallyNotificationRegistered,
  isSubscriptionActive,
}: SettingControllerProps) {
  const router = useRouter();
  const [hue, setHue] = useState(0);
  const notificationSettings = useNotificationSettings({
    initialError: initialNotificationError,
    initiallyRegistered: initiallyNotificationRegistered,
    initialSettings: initialNotificationSettings,
    onSaved() {
      router.replace("/Home");
    },
  });

  return (
    <SettingView
      hue={hue}
      isSubscriptionActive={isSubscriptionActive}
      onHueChange={setHue}
      {...notificationSettings}
    />
  );
}
