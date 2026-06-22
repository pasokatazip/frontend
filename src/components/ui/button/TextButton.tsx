import type { ButtonHTMLAttributes } from "react";

type TextButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function TextButton({
  type = "button",
  ...props
}: TextButtonProps) {
  return (
    <button
      className="mx-auto mt-3 block text-center font-[Inter] text-xs leading-none font-normal tracking-normal text-red-700 underline underline-offset-2"
      type={type}
      {...props}
    />
  );
}
