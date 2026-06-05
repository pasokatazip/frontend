import { clsx } from "clsx";
import type { ButtonHTMLAttributes, CSSProperties } from "react";

const buttonBaseClassName =
  "h-24 w-full max-w-5xl rounded-full border-2 border-transparent text-2xl font-bold text-white [text-shadow:0_3px_5px_rgba(0,0,0,0.38)]";

// 色違いのボタンを増やすときは、ここにblueなどのkeyを追加する
// 各variantで本体グラデーション、枠グラデーション、色ごとの影を管理する
const buttonVariants = {
  green: {
    className: "shadow-[0_0_5px_#009C57,inset_0_4px_10px_#B8FFDF]",
    style: {
      background:
        "linear-gradient(180deg, #50DC7C 10%, #5BECB7 99%) padding-box, linear-gradient(180deg, rgba(0, 156, 87, 0.18) 0%, #009C57 100%) border-box",
    },
  },
} satisfies Record<string, { className: string; style: CSSProperties }>;

type ButtonVariant = keyof typeof buttonVariants;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function Button({
  className,
  type = "button",
  variant = "green",
  ...props
}: ButtonProps) {
  const buttonVariant = buttonVariants[variant];

  return (
    <button
      className={clsx(
        buttonBaseClassName,
        buttonVariant.className,
        className,
      )}
      style={buttonVariant.style}
      type={type}
      {...props}
    />
  );
}
