import { clsx } from "clsx";
import type { ButtonHTMLAttributes, CSSProperties } from "react";
import { gradients } from "@/components/layout/gradientLayout";
import { shadows } from "@/components/layout/shadowLayout";

const greenButtonStyle = {
  background: gradients.green,
  boxShadow: shadows.green,
} satisfies CSSProperties;

type GreenButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function GreenButton({
  className,
  style,
  type = "button",
  ...props
}: GreenButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex h-24 w-full max-w-5xl items-center justify-center rounded-full border-2 border-transparent font-[Inter] text-2xl leading-none font-normal tracking-normal text-white [text-shadow:0_0_2px_#006528]",
        className,
      )}
      style={{ ...greenButtonStyle, ...style }}
      type={type}
      {...props}
    />
  );
}
