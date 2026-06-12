import { clsx } from "clsx";
import type { ButtonHTMLAttributes, CSSProperties } from "react";
import Image from "next/image";

import { gradients } from "@/components/layout/gradientLayout";

interface RoundButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  image: string;
  label: string;
}

const buttonBaseClassName =
  "aspect-square min-w-14.5 min-h-12.5 rounded-full border-2 border-transparent overflow-hidden";

const roundButtonShadowClassName =
  "shadow-[0_0_5px_#5BD4EC,inset_0_4px_10px_#FFFFFF]";

const roundButtonStyle = {
  background: gradients.silver,
} satisfies CSSProperties;

export function RoundButton({
  image,
  label,
  className,
  type = "button",
  ...props
}: RoundButtonProps) {
  return (
    <div className="inline-flex flex-col items-center gap-1">
      <button
        className={clsx(
          buttonBaseClassName,
          roundButtonShadowClassName,
          className,
        )}
        style={roundButtonStyle}
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
