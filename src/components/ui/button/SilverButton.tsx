import { clsx } from "clsx";
import type {
  ButtonHTMLAttributes,
  CSSProperties,
  HTMLAttributes,
} from "react";
import { gradients } from "@/components/layout/gradientLayout";
import { shadows } from "@/components/layout/shadowLayout";

const silverButtonStyle = {
  background: gradients.silver,
  boxShadow: shadows.silver,
} satisfies CSSProperties;

type SilverButtonAsButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: "button";
};

type SilverButtonAsDivProps = HTMLAttributes<HTMLDivElement> & {
  as: "div";
};

type SilverButtonProps = SilverButtonAsButtonProps | SilverButtonAsDivProps;

const silverButtonClassName =
  "inline-flex h-24 w-full max-w-5xl items-center justify-center rounded-full border-2 border-transparent text-2xl leading-none font-normal tracking-normal text-black [text-shadow:0_0_2px_#FFFFFF]";

export function SilverButton(props: SilverButtonProps) {
  if (props.as === "div") {
    const { as: _, className, style, ...divProps } = props;

    return (
      <div
        className={clsx(silverButtonClassName, className)}
        style={{ ...silverButtonStyle, ...style }}
        {...divProps}
      />
    );
  }

  const {
    as: _,
    className,
    style,
    type = "button",
    ...buttonProps
  } = props;

  return (
    <button
      className={clsx(silverButtonClassName, className)}
      style={{ ...silverButtonStyle, ...style }}
      type={type}
      {...buttonProps}
    />
  );
}
