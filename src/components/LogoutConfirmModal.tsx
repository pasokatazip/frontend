"use client";

import { BlueButton } from "@/components/ui/button/BlueButton";
import { SilverButton } from "@/components/ui/button/SilverButton";
import { GlassCard } from "@/components/ui/card/GlassCard";

interface LogoutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function LogoutConfirmModal({
  isOpen,
  onClose,
  onConfirm,
}: LogoutConfirmModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <GlassCard
        className="
            w-80 rounded-2xl px-5.5 py-10
            text-[#4C4F5E]
            !shadow-[0_0_4px_0_rgba(82,82,82,1)]
            "
        onClick={(event) => event.stopPropagation()}
      >
        <p className="text-center text-sm">ログアウトしますか？</p>

        <div className="mt-6 flex flex-col gap-4">
          <BlueButton className="m-auto max-h-12 text-xs" onClick={onConfirm}>
            ログアウト
          </BlueButton>
          <SilverButton className="m-auto max-h-12 text-xs" onClick={onClose}>
            キャンセル
          </SilverButton>
        </div>
      </GlassCard>
    </div>
  );
}
