import { ToggleButton } from "@/components/ui/button/ToggleButton";
import { BlueCheckBox } from "@/components/ui/checkbox/BlueCheckBox";

export function NotificationSettingSection() {
  return (
    <section className="mt-8">
      <div className="flex min-h-7 items-center justify-between">
        <span className="text-base leading-6 font-normal tracking-normal text-[#4C4F5E]">
          通知
        </span>
        <div className="flex h-7 w-[52px] items-center justify-end overflow-visible">
          <div className="origin-right scale-[0.32]">
            <ToggleButton aria-label="通知" defaultPressed />
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
          <BlueCheckBox aria-label="レポート作成完了" />
        </div>

        <div className="flex items-center justify-between">
          <span
            className="text-base leading-6 font-normal tracking-normal text-[#4C4F5E]"
            id="pet-message-label"
          >
            ペットからのメッセージ
          </span>
          <BlueCheckBox aria-label="ペットからのメッセージ" />
        </div>

        <div className="flex items-center justify-between">
          <span
            className="text-base leading-6 font-normal tracking-normal text-[#4C4F5E]"
            id="yo-yo-label"
          >
            YO-YO！
          </span>
          <BlueCheckBox aria-label="YO-YO！" defaultChecked />
        </div>
      </div>
    </section>
  );
}
