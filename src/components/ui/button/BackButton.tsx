import { clsx } from "clsx";
import type { ButtonHTMLAttributes } from "react";

type BackButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function BackButton({
  children = "もどる",
  className,
  type = "button",
  ...props
}: BackButtonProps) {
  return (
    <button
      className={clsx(
        "rounded-full border border-[#4CBFA8] bg-[#8CE3C5]/90 px-4 py-2 text-xs leading-none font-normal text-[#4C4F5E] shadow-[0_0_4px_rgba(0,128,247,0.25)]",
        className,
      )}
      type={type}
      {...props}
    >
      ‹&nbsp;&nbsp;{children}
    </button>
  );
}
