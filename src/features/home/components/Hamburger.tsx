"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { gradients } from "@/components/layout/gradientLayout";
import { shadows } from "@/components/layout/shadowLayout";
import clsx from "clsx";
import Link from "next/link";
import { LogoutConfirmModal } from "./LogoutConfirmModal";

const silverNavStyle = {
  background: gradients.silver,
  boxShadow: shadows.silver,
} satisfies CSSProperties;

interface HamburgerProps {
  className?: string;
  onClose?: () => void;
  onLogout: () => void;
}

export function Hamburger({ className, onClose, onLogout }: HamburgerProps) {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const openLogoutModal = () => setIsLogoutModalOpen(true);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);

  const handleLogoutConfirm = () => {
    closeLogoutModal();
    onLogout();
  };

  return (
    <>
      <nav
        className={clsx(
          "fixed bottom-45 right-0 rounded-l-2xl p-6.5 pr-8 text-[#4C4F5E]",
          className,
        )}
        style={silverNavStyle}
      >
        <ul className="w-40 text-4">
          <li>
            <Link
              href="/Help"
              className="
                flex items-center gap-4 p-3 pl-0
                before:block before:h-8 before:w-8
                before:bg-[url('/icons/help.svg')]
                before:bg-contain before:bg-no-repeat
                before:content-['']
                border-b border-b-white
              "
            >
              ヘルプ
            </Link>
          </li>

          <li>
            <Link
              href="/Setting"
              className="
                flex items-center gap-4 p-3 pl-0
                before:block before:h-8 before:w-8
                before:bg-[url('/icons/setting.svg')]
                before:bg-contain before:bg-no-repeat
                before:content-['']
                border-b border-b-white
              "
            >
              設定
            </Link>
          </li>

          <li>
            <Link
              href="/Subscription"
              className="
                flex items-center gap-4 p-3 pl-0
                before:block before:h-8 before:w-8
                before:bg-[url('/icons/lock.svg')]
                before:bg-contain before:bg-no-repeat
                before:content-['']
                border-b border-b-white
              "
            >
              超-YO-YO！
            </Link>
          </li>

          <li>
            <button
              type="button"
              onClick={openLogoutModal}
              className="
                flex w-full items-center gap-4 p-3 pl-0
                before:block before:h-8 before:w-8
                before:bg-[url('/icons/log-out.svg')]
                before:bg-contain before:bg-no-repeat
                before:content-['']
              "
            >
              ログアウト
            </button>
          </li>
        </ul>

        <button
          aria-label="メニューを閉じる"
          onClick={onClose}
          type="button"
          className="
            flex w-full items-center justify-end
            before:block before:h-5 before:w-5
            before:bg-[url('/icons/close.svg')]
            before:bg-contain before:bg-no-repeat
            before:content-['']
          "
        />
      </nav>

      <LogoutConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={closeLogoutModal}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
}
