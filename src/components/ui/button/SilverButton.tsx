import { clsx } from "clsx";
import type { ButtonHTMLAttributes, CSSProperties } from "react";
import { gradients } from "@/components/layout/gradientLayout";
import { shadows } from "@/components/layout/shadowLayout";

const silverButtonStyle = {
  background: gradients.silver,
  boxShadow: shadows.silver,
} satisfies CSSProperties;

type SilverButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function SilverButton({
  className,
  style,
  type = "button",
  ...props
}: SilverButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex h-24 w-full max-w-5xl items-center justify-center rounded-full border-2 border-transparent text-2xl leading-none font-normal tracking-normal text-black [text-shadow:0_0_2px_#FFFFFF]",
        className,
      )}
      style={{ ...silverButtonStyle, ...style }}
      type={type}
      {...props}
    />
  );
}
