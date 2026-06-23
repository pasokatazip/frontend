import type { CSSProperties } from "react";
import { gradients } from "@/components/layout/gradientLayout";
import { shadows } from "@/components/layout/shadowLayout";
import clsx from "clsx";

const silverNavStyle = {
  background: gradients.silver,
  boxShadow: shadows.silver,
} satisfies CSSProperties;

interface HamburgerProps {
  className?: string;
  onClose?: () => void;
}

export function Hamburger({ className, onClose }: HamburgerProps) {
  return (
    <nav
      className={clsx(
        "fixed bottom-45 right-0 p-6.5 pr-8 rounded-l-2xl",
        className,
      )}
      style={silverNavStyle}
    >
      {" "}
      <ul className="text-4 w-40">
        <li>
          <a
            href=""
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
          </a>
        </li>
        <li>
          <a
            href=""
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
          </a>
        </li>
        <li>
          <a
            href=""
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
          </a>
        </li>
        <li>
          <a
            href=""
            className="
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
          </a>
        </li>
      </ul>
      <button
        onClick={onClose}
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
