import type { CSSProperties } from "react";
import { gradients } from "@/components/layout/gradientLayout";
import { shadows } from "@/components/layout/shadowLayout";
import clsx from "clsx";
import Link from "next/link";

const silverNavStyle = {
  background: gradients.silver,
  boxShadow: shadows.silver,
} satisfies CSSProperties;

interface HamburgerProps {
  className?: string;
  onClose?: () => void;
  onLogout: () => void;
}

export function Hamburger({
  className,
  onClose,
  onLogout,
}: HamburgerProps) {
  return (
    <nav
      className={clsx(
        "fixed bottom-45 right-0 p-6.5 pr-8 rounded-l-2xl text-[#4C4F5E]",
        className,
      )}
      style={silverNavStyle}
    >
      {" "}
      <ul className="text-4 w-40">
        <li>
          <Link
            href="/Help"
            className="
                    flex items-center gap-4 p-3 pl-0
                    before:content-['']
                    before:block
                    before:w-8
                    before:h-8
                    before:bg-[url('/icons/help.svg')]
                    before:bg-contain
                    before:bg-no-repeat
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
                before:content-['']
                before:block
                before:w-8
                before:h-8
                before:bg-[url('/icons/setting.svg')]
                before:bg-contain
                before:bg-no-repeat
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
                before:content-['']
                before:block
                before:w-8
                before:h-8
                before:bg-[url('/icons/lock.svg')]
                before:bg-contain
                before:bg-no-repeat
                border-b border-b-white
                "
          >
            超-YO-YO！
          </Link>
        </li>
        <li>
          <button
            type="button"
            onClick={onLogout}
            className="
                w-full
                flex items-center gap-4 p-3 pl-0
                before:content-['']
                before:block
                before:w-8
                before:h-8
                before:bg-[url('/icons/log-out.svg')]
                before:bg-contain
                before:bg-no-repeat
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
                flex justify-end items-center w-full
                before:content-['']
                before:block
                before:w-5
                before:h-5
                before:bg-[url('/icons/close.svg')]
                before:bg-contain
                before:bg-no-repeat
                "
      />
    </nav>
  );
}
