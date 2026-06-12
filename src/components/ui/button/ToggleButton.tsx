"use client";

import { clsx } from "clsx";
import type { ButtonHTMLAttributes, MouseEvent } from "react";
import { useState } from "react";
import { gradients } from "@/components/layout/gradientLayout";
import { shadows } from "@/components/layout/shadowLayout";

type ToggleButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "aria-checked" | "aria-label" | "role"
> & {
  "aria-label": string;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  pressed?: boolean;
};

export function ToggleButton({
  className,
  defaultPressed = false,
  onClick,
  onPressedChange,
  pressed,
  style,
  type = "button",
  ...props
}: ToggleButtonProps) {
  const [internalPressed, setInternalPressed] = useState(defaultPressed);
  const isPressed = pressed ?? internalPressed;

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const nextPressed = !isPressed;

    if (pressed === undefined) {
      setInternalPressed(nextPressed);
    }

    onPressedChange?.(nextPressed);
    onClick?.(event);
  };

  return (
    <button
      {...props}
      aria-checked={isPressed}
      className={clsx(
        "relative h-[5.375rem] w-[10.25rem] rounded-full border-2 border-transparent transition-shadow duration-200",
        className,
      )}
      onClick={handleClick}
      role="switch"
      style={{
        background: isPressed ? gradients.blue : gradients.silver,
        boxShadow: isPressed ? shadows.blue : shadows.silver,
        ...style,
      }}
      type={type}
    >
      <span
        className={clsx(
          "absolute left-0 top-1/2 h-[3.75rem] w-[3.75rem] -translate-y-1/2 rounded-full border border-black/5 bg-[linear-gradient(180deg,#E9E9E9_47%,#FFFFFF_99%)] transition-transform duration-500",
          isPressed ? "translate-x-[5.25rem]" : "translate-x-2",
        )}
        style={{ boxShadow: shadows.black }}
      />
    </button>
  );
}
