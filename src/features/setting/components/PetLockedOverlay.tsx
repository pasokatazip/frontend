import Image from "next/image";
import type { CSSProperties } from "react";
import { gradients } from "@/components/layout/gradientLayout";

const lockedOverlayStyle = {
  background: gradients.lockedBlue,
} satisfies CSSProperties;

export function PetLockedOverlay() {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center gap-5">
      <div
        aria-hidden="true"
        className="absolute inset-0 backdrop-blur-[4px]"
        style={lockedOverlayStyle}
      />
      <Image
        src="/icons/lock.svg"
        alt=""
        width={32}
        height={32}
        className="relative z-10 h-8 w-8"
      />
      <span className="relative z-10 font-[Inter] text-xl leading-7 font-normal tracking-normal text-white sm:text-2xl">
        超YO-YO！後使用可能
      </span>
    </div>
  );
}
