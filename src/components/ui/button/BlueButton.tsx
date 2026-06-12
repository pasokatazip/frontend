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
        "h-24 w-full max-w-5xl rounded-full border-2 border-transparent text-2xl font-bold text-white",
        className,
      )}
      style={{ ...blueButtonStyle, ...style }}
      type={type}
      {...props}
    />
  );
}
