import { SilverButton } from "@/components/ui/button/SilverButton";

type DateSelectorProps = {
  text: string;
  onPrev: () => void;
  onNext: () => void;
  onOpen?: () => void;
};

export function DateSelector({
  text,
  onPrev,
  onNext,
  onOpen,
}: DateSelectorProps) {
  return (
    <SilverButton className="max-h-10 max-w-full p-2 flex justify-between! gap-2.5 text-[16px]">
      <button onClick={onPrev}>
        <span
          className="
            block w-6 h-6
            bg-[url('/icons/arrowFront.svg')]
            bg-contain bg-no-repeat            "
        />
      </button>

      <button onClick={onOpen}>{text}</button>

      <button onClick={onNext}>
        <span
          className="
            block w-6 h-6
            bg-[url('/icons/arrowBack.svg')]
            bg-contain bg-no-repeat            "
        />
      </button>
    </SilverButton>
  );
}
