import { clsx } from "clsx";
import type { ButtonHTMLAttributes, CSSProperties } from "react";
import { gradients } from "@/components/layout/gradientLayout";
import { shadows } from "@/components/layout/shadowLayout";

const blueButtonStyle = {
  background: gradients.blue,
  boxShadow: shadows.blue,
} satisfies CSSProperties;

type BlueButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function BlueButton({
  className,
  style,
  type = "button",
  ...props
}: BlueButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex h-24 w-full max-w-5xl items-center justify-center rounded-full border-2 border-transparent text-2xl leading-none font-normal tracking-normal text-white [text-shadow:0_0_2px_#0041FF]",
        className,
      )}
      style={{ ...blueButtonStyle, ...style }}
      type={type}
      {...props}
    />
  );
}
