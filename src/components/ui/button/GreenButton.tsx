import { clsx } from "clsx";
import type { ButtonHTMLAttributes, CSSProperties } from "react";
import { gradients } from "@/components/layout/gradientLayout";

const buttonBaseClassName =
  "h-24 w-full max-w-5xl rounded-full border-2 border-transparent text-2xl font-bold text-white [text-shadow:0_3px_5px_rgba(0,0,0,0.38)]";

const greenButtonShadowClassName =
  "shadow-[0_0_5px_#009C57,inset_0_4px_10px_#B8FFDF]";

const greenButtonStyle = {
  background: gradients.green,
} satisfies CSSProperties;

type GreenButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function GreenButton({
  className,
  type = "button",
  ...props
}: GreenButtonProps) {
  return (
    <button
      className={clsx(
        buttonBaseClassName,
        greenButtonShadowClassName,
        className,
      )}
      style={greenButtonStyle}
      type={type}
      {...props}
    />
  );
}
