import { clsx } from "clsx";
import type { CSSProperties, InputHTMLAttributes } from "react";
import { gradients } from "@/components/layout/gradientLayout";
import { shadows } from "@/components/layout/shadowLayout";

type TextInputProps = InputHTMLAttributes<HTMLInputElement>;

const textInputStyle = {
  background: gradients.white,
  boxShadow: shadows.white,
} satisfies CSSProperties;

export function TextInput({ className, style, ...props }: TextInputProps) {
  return (
    <input
      className={clsx(
        "h-[3.25rem] w-full rounded-lg px-4 font-[Inter] text-base text-[#454545] outline-none placeholder:text-white/70 focus:ring-2 focus:ring-white",
        className,
      )}
      style={{ ...textInputStyle, ...style }}
      {...props}
    />
  );
}
