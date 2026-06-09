import { clsx } from "clsx";
import type { ButtonHTMLAttributes, CSSProperties } from "react";
import { gradients } from "@/components/layout/gradientLayout";

const buttonBaseClassName =
  "h-24 w-full max-w-5xl rounded-full border-2 border-transparent text-2xl font-bold text-white [text-shadow:0_3px_5px_rgba(0,0,0,0.38)]";

const blueButtonShadowClassName =
  "shadow-[0_0_5px_#0041FF,inset_0_4px_10px_#98D9FF]";

const blueButtonStyle = {
  background: gradients.blue,
} satisfies CSSProperties;

type BlueButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function BlueButton({
  className,
  type = "button",
  ...props
}: BlueButtonProps) {
  return (
    <button
      className={clsx(
        buttonBaseClassName,
        blueButtonShadowClassName,
        className,
      )}
      style={blueButtonStyle}
      type={type}
      {...props}
    />
  );
}
