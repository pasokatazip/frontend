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
        "h-24 w-full max-w-5xl rounded-full border-2 border-transparent text-2xl font-bold text-white",
        className,
      )}
      style={{ ...greenButtonStyle, ...style }}
      type={type}
      {...props}
    />
  );
}
