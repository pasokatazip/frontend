import type { ChangeEvent } from "react";
import { shadows } from "@/components/layout/shadowLayout";
import { GreenButton } from "@/components/ui/button/GreenButton";
import { TextArea } from "@/components/ui/input/TextArea";

type PostComposerProps = {
  onSubmit?: (message: string) => void;
  onValueChange: (value: string) => void;
  placeholder?: string;
  value: string;
};

export function PostComposer({
  onSubmit,
  onValueChange,
  placeholder = "今日は何した？",
  value,
}: PostComposerProps) {
  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    onValueChange(event.currentTarget.value);
  }

  function handleSubmit() {
    onSubmit?.(value);
  }

  return (
    <div className="mx-auto w-full max-w-[344px]">
      <TextArea
        aria-label="つぶやき"
        className="block h-[147px] rounded-[12px] rounded-br-none border border-[#5BD4EC]"
        onChange={handleChange}
        placeholder={placeholder}
        value={value}
      />
      <div className="-mt-px flex justify-end">
        <GreenButton
          className="h-[3.25rem] w-[60%] max-w-[12.5rem] rounded-t-none rounded-b-[12px] text-base !text-[#4C4F5E]"
          onClick={handleSubmit}
          style={{ textShadow: shadows.dropwhite }}
        >
          つぶやく
        </GreenButton>
      </div>
    </div>
  );
}
