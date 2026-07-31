import { ToggleButton } from "@/components/ui/button/ToggleButton";
import { BlueCheckBox } from "@/components/ui/checkbox/BlueCheckBox";
import type { NotificationSettings } from "@/features/setting/schemas/notificationSettingsSchema";

type NotificationSettingSectionProps = {
  onChange: (settings: NotificationSettings) => void;
  onNotificationEnabledChange: (enabled: boolean) => void;
  settings: NotificationSettings;
};

export function NotificationSettingSection({
  onChange,
  onNotificationEnabledChange,
  settings,
}: NotificationSettingSectionProps) {
  function updateSetting<Key extends keyof NotificationSettings>(
    key: Key,
    value: NotificationSettings[Key],
  ) {
    onChange({ ...settings, [key]: value });
  }

  return (
    <section className="mt-8">
      <div className="flex min-h-7 items-center justify-between">
        <span className="text-base leading-6 font-normal tracking-normal text-[#4C4F5E]">
          通知
        </span>
        <div className="flex h-7 w-[52px] items-center justify-end overflow-visible">
          <div className="origin-right scale-[0.32]">
            <ToggleButton
              aria-label="通知"
              onPressedChange={onNotificationEnabledChange}
              pressed={settings.isAllEnabled}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 h-px bg-[#4C4F5E]/40" />

      <div className="mt-4 space-y-5">
        <div className="flex items-center justify-between">
          <span
            className="text-base leading-6 font-normal tracking-normal text-[#4C4F5E]"
            id="report-completed-label"
          >
            レポート作成完了
          </span>
          <BlueCheckBox
            aria-label="レポート作成完了"
            checked={settings.isReportEnabled}
            disabled={!settings.isAllEnabled}
            onCheckedChange={(checked) =>
              updateSetting("isReportEnabled", checked)
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <span
            className="text-base leading-6 font-normal tracking-normal text-[#4C4F5E]"
            id="pet-message-label"
          >
            ペットからのメッセージ
          </span>
          <BlueCheckBox
            aria-label="ペットからのメッセージ"
            checked={settings.isMessageEnabled}
            disabled={!settings.isAllEnabled}
            onCheckedChange={(checked) =>
              updateSetting("isMessageEnabled", checked)
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <span
            className="text-base leading-6 font-normal tracking-normal text-[#4C4F5E]"
            id="yo-yo-label"
          >
            YO-YO！
          </span>
          <BlueCheckBox
            aria-label="YO-YO！"
            checked={settings.isYoyoEnabled}
            disabled={!settings.isAllEnabled}
            onCheckedChange={(checked) =>
              updateSetting("isYoyoEnabled", checked)
            }
          />
        </div>
      </div>
    </section>
  );
}
