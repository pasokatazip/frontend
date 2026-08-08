"use client";

import { useEffect, useRef, useState } from "react";
import { createNotificationSettingsAction } from "@/features/setting/actions/CreateNotificationSettingsAction";
import { updateNotificationSettingsAction } from "@/features/setting/actions/UpdateNotificationSettingsAction";
import type { NotificationSettings } from "@/features/setting/schemas/notificationSettingsSchema";
import {
  getWebPushSubscription,
  type PushSubscriptionValues,
} from "@/lib/webPush";

const defaultNotificationSettings = {
  isAllEnabled: false,
  isMessageEnabled: false,
  isReportEnabled: false,
  isYoyoEnabled: true,
} satisfies NotificationSettings;

type UseNotificationSettingsOptions = {
  initialError?: string;
  initiallyRegistered: boolean;
  initialSettings?: NotificationSettings;
  onSaved: () => void;
};

export function useNotificationSettings({
  initialError,
  initiallyRegistered,
  initialSettings,
  onSaved,
}: UseNotificationSettingsOptions) {
  const isRegistered = initiallyRegistered;
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(initialError);
  const [settings, setSettings] = useState<NotificationSettings>(
    initialSettings ?? defaultNotificationSettings,
  );
  const pendingPushSubscription = useRef<PushSubscriptionValues | null>(null);

  // Notification.permissionはサーバー側で確認できないため、マウント後にAPIの設定値と同期する
  useEffect(() => {
    const hasNotificationPermission =
      "Notification" in window && Notification.permission === "granted";

    if (!hasNotificationPermission) {
      setSettings((currentSettings) =>
        currentSettings.isAllEnabled
          ? { ...currentSettings, isAllEnabled: false }
          : currentSettings,
      );
    }
  }, []);

  async function handleEnabledChange(enabled: boolean) {
    if (!enabled) {
      setSettings((currentSettings) => ({
        ...currentSettings,
        isAllEnabled: false,
      }));
      return;
    }

    setError(undefined);

    try {
      pendingPushSubscription.current = await getWebPushSubscription();
      setSettings((currentSettings) => ({
        ...currentSettings,
        isAllEnabled: true,
      }));
    } catch (subscriptionError) {
      setError(
        subscriptionError instanceof Error
          ? subscriptionError.message
          : "プッシュ通知を設定できませんでした",
      );
    }
  }

  async function handleSave() {
    setIsSaving(true);
    setError(undefined);

    let subscription: PushSubscriptionValues | undefined;

    try {
      if (settings.isAllEnabled) {
        subscription =
          pendingPushSubscription.current ?? (await getWebPushSubscription());
      }
    } catch (subscriptionError) {
      setError(
        subscriptionError instanceof Error
          ? subscriptionError.message
          : "プッシュ通知を設定できませんでした",
      );
      setIsSaving(false);
      return;
    }

    if (!isRegistered && !subscription) {
      setIsSaving(false);
      onSaved();
      return;
    }

    const result = isRegistered
      ? await updateNotificationSettingsAction({
          ...settings,
          subscription,
        })
      : await createNotificationSettingsAction({
          ...settings,
          subscription,
        });

    setIsSaving(false);

    if (!result.success) {
      setError(result.error);
      return;
    }

    onSaved();
  }

  return {
    isSaving,
    notificationError: error,
    notificationSettings: settings,
    onNotificationEnabledChange: handleEnabledChange,
    onNotificationSettingsChange: setSettings,
    onSave: handleSave,
  };
}
