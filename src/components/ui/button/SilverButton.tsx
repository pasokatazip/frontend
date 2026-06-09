import { clsx } from "clsx";
import type { ButtonHTMLAttributes, CSSProperties } from "react";
import { gradients } from "@/components/layout/gradientLayout";

const buttonBaseClassName =
  "h-24 w-full max-w-5xl rounded-full border-2 border-transparent text-2xl font-bold text-white";

const silverButtonShadowClassName =
  "shadow-[0_0_5px_#5BD4EC,inset_0_4px_10px_#FFFFFF]";

const silverButtonStyle = {
  background: gradients.silver,
} satisfies CSSProperties;

type SilverButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function SilverButton({
  className,
  type = "button",
  ...props
}: SilverButtonProps) {
  return (
    <button
      className={clsx(
        buttonBaseClassName,
        silverButtonShadowClassName,
        className,
      )}
      style={silverButtonStyle}
      type={type}
      {...props}
    />
  );
}
