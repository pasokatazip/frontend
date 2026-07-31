import { clsx } from "clsx";
import type { CSSProperties, TextareaHTMLAttributes } from "react";
import { gradients } from "@/components/layout/gradientLayout";
import { shadows } from "@/components/layout/shadowLayout";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

const textAreaStyle = {
  background: gradients.white,
  boxShadow: shadows.silver,
} satisfies CSSProperties;

export function TextArea({ className, style, ...props }: TextAreaProps) {
  return (
    <textarea
      className={clsx(
        "w-full resize-none rounded-lg px-4 py-4 text-base leading-6 font-normal tracking-normal text-[#4C4F5E] outline-none placeholder:text-[#9298A8] focus:ring-2 focus:ring-[#5BD4EC]",
        className,
      )}
      style={{ ...textAreaStyle, ...style }}
      {...props}
    />
  );
}
