"use client";

import { SilverButton } from "@/components/ui/button/SilverButton";

type CalendarButtonProps = {
  text: string;
  onClick: () => void;
};

export function CalendarButton({ text, onClick }: CalendarButtonProps) {
  return (
    <SilverButton
      className="max-h-10 max-w-[50%] p-2 gap-2 flex text-[16px]"
      onClick={onClick}
    >
      <span className="min-w-[80%] p-2 rounded-full rounded-r-none bg-white">
        {text}
      </span>
      <span
        className="
            block w-5 h-5
            bg-[url('/icons/calendar.svg')]
            bg-contain bg-no-repeat
            m-2 p-3            
            "
      />
    </SilverButton>
  );
}
