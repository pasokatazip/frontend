"use client";

import Image from "next/image";
import { TextButton } from "@/components/ui/button/TextButton";
import { NotificationSettingSection } from "@/features/setting/components/NotificationSettingSection";
import type { NotificationSettings } from "@/features/setting/schemas/notificationSettingsSchema";
import { PetLockedOverlay } from "@/features/setting/components/PetLockedOverlay";
import { SettingFooter } from "@/features/setting/components/SettingFooter";
import { PetSettingSection } from "@/components/ui/color/PetSettingSection";
import { BlueButton } from "@/components/ui/button/BlueButton";

type SettingViewProps = {
  hue: number;
  isSaving: boolean;
  isSubscriptionActive: boolean;
  notificationError?: string;
  notificationSettings: NotificationSettings;
  onHueChange: (value: number) => void;
  onNotificationEnabledChange: (enabled: boolean) => void;
  onNotificationSettingsChange: (settings: NotificationSettings) => void;
  onSave: () => void;
};

export function SettingView({
  hue,
  isSaving,
  isSubscriptionActive,
  notificationError,
  notificationSettings,
  onHueChange,
  onNotificationEnabledChange,
  onNotificationSettingsChange,
  onSave,
}: SettingViewProps) {
  return (
    <main className="mobile-safe-scroll-screen relative overflow-hidden bg-[url('/images/background.png')] bg-cover bg-[position:center_top] bg-no-repeat px-4">
      <div className="mobile-safe-content mx-auto flex w-full max-w-[28rem] flex-col">
        <header className="flex items-center gap-5">
          <Image
            src="/icons/setting.svg"
            alt=""
            width={32}
            height={32}
            className="h-10 w-10"
          />
          <h1 className="text-lg leading-6 font-normal tracking-normal text-[#4C4F5E]">
            設定
          </h1>
        </header>

        <section className="mt-8">
          <h2 className="text-base leading-6 font-normal tracking-normal text-[#4C4F5E]">
            ペット設定
          </h2>
          <PetSettingSection compact hue={hue} onHueChange={onHueChange}>
            {!isSubscriptionActive && <PetLockedOverlay />}
          </PetSettingSection>
        </section>
        <NotificationSettingSection
          onChange={onNotificationSettingsChange}
          onNotificationEnabledChange={onNotificationEnabledChange}
          settings={notificationSettings}
        />

        <TextButton className="mt-14 w-fit text-base leading-6 font-normal tracking-normal text-red-600 underline underline-offset-2">
          アカウント削除
        </TextButton>
        <p
          aria-live="polite"
          className="mt-4 min-h-5 text-center text-xs leading-5 text-red-600"
        >
          {notificationError}
        </p>
        <BlueButton
          className="mx-auto mt-2 mb-4 max-h-12 max-w-[75%] text-base"
          disabled={isSaving}
          onClick={onSave}
        >
          設定を保存する
        </BlueButton>

        <SettingFooter />
      </div>
    </main>
  );
}
