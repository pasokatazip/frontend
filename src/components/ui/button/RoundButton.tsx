import { clsx } from "clsx";
import type { ButtonHTMLAttributes, CSSProperties } from "react";
import Image from "next/image";

import { gradients } from "@/components/layout/gradientLayout";
import { shadows } from "@/components/layout/shadowLayout";

interface RoundButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  image: string;
  label: string;
}

const roundButtonStyle = {
  background: gradients.silver,
  boxShadow: shadows.silver,
} satisfies CSSProperties;

export function RoundButton({
  image,
  label,
  className,
  style,
  type = "button",
  ...props
}: RoundButtonProps) {
  return (
    <div className="inline-flex flex-col items-center gap-1">
      <button
        className={clsx(
          "aspect-square min-h-12.5 min-w-14.5 overflow-hidden rounded-full border-2 border-transparent",
          className,
        )}
        style={{ ...roundButtonStyle, ...style }}
        type={type}
        {...props}
      >
        <Image
          src={image}
          alt={label}
          width={50}
          height={50}
          className="h-full w-full object-cover p-2.5"
        />
      </button>

      <span className="text-sm whitespace-nowrap font-medium">{label}</span>
    </div>
  );
}
