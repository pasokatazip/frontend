import type { CSSProperties } from "react";
import { gradients } from "@/components/layout/gradientLayout";
import { shadows } from "@/components/layout/shadowLayout";

const dateSelectorStyle = {
  background: gradients.silver,
  boxShadow: shadows.silver,
} satisfies CSSProperties;

type DateSelectorProps = {
  text: string;
  onPrev: () => void;
  onNext: () => void;
  onOpen?: () => void;
};

export function DateSelector({
  text,
  onPrev,
  onNext,
  onOpen,
}: DateSelectorProps) {
  return (
    <div
      className="flex h-10 w-full max-w-full items-center justify-between gap-2.5 rounded-full border-2 border-transparent p-2 text-base leading-none font-normal tracking-normal text-black [text-shadow:0_0_2px_#FFFFFF]"
      style={dateSelectorStyle}
    >
      <button aria-label="前へ" onClick={onPrev} type="button">
        <span
          aria-hidden="true"
          className="
            block w-6 h-6
            bg-[url('/icons/arrowFront.svg')]
            bg-contain bg-no-repeat            "
        />
      </button>

      {onOpen ? (
        <button
          className="min-w-0 flex-1 truncate"
          onClick={onOpen}
          type="button"
        >
          {text}
        </button>
      ) : (
        <span className="min-w-0 flex-1 truncate text-center">{text}</span>
      )}

      <button aria-label="次へ" onClick={onNext} type="button">
        <span
          aria-hidden="true"
          className="
            block w-6 h-6
            bg-[url('/icons/arrowBack.svg')]
            bg-contain bg-no-repeat            "
        />
      </button>
    </div>
  );
}
