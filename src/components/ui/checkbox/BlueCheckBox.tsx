"use client";

import { clsx } from "clsx";
import type {
  ChangeEvent,
  ChangeEventHandler,
  CSSProperties,
  InputHTMLAttributes,
} from "react";
import { useState } from "react";
import { gradients } from "@/components/layout/gradientLayout";
import { shadows } from "@/components/layout/shadowLayout";

type NativeInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  | "aria-label"
  | "checked"
  | "className"
  | "defaultChecked"
  | "onChange"
  | "style"
  | "type"
>;

type BlueCheckBoxProps = NativeInputProps & {
  "aria-label": string;
  checked?: boolean;
  className?: string;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  style?: CSSProperties;
};

export function BlueCheckBox({
  checked,
  className,
  defaultChecked = false,
  onCheckedChange,
  onChange,
  style,
  ...props
}: BlueCheckBoxProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked = checked ?? internalChecked;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const nextChecked = event.currentTarget.checked;

    if (checked === undefined) {
      setInternalChecked(nextChecked);
    }

    onCheckedChange?.(nextChecked);
    onChange?.(event);
  }

  return (
    <label className="inline-block">
      <input
        {...props}
        aria-label={props["aria-label"]}
        checked={isChecked}
        className="sr-only"
        onChange={handleChange}
        type="checkbox"
      />
      <span
        className={clsx(
          "relative block h-[17px] w-[17px] rounded-[3px] border border-transparent transition-shadow duration-200",
          className,
        )}
        style={{
          background: isChecked ? gradients.blue : gradients.silver,
          boxShadow: isChecked ? shadows.dropblue : shadows.lightblue,
          ...style,
        }}
      >
        {isChecked ? (
          <svg
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-[9px] w-3 -translate-x-1/2 -translate-y-1/2"
            fill="none"
            style={{ filter: `drop-shadow(${shadows.black})` }}
            viewBox="0 0 12 9"
          >
            <path
              d="M1 4.5L4.4 8L11 1"
              stroke="#FFFFFF"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        ) : null}
      </span>
    </label>
  );
}
