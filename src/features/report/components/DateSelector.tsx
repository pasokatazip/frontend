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
    <SilverButton
      as="div"
      className="max-h-10 max-w-full justify-between! gap-2.5 p-2 text-[16px]"
    >
      <button type="button" onClick={onPrev}>
        <span
          aria-hidden="true"
          className="
            block w-6 h-6
            bg-[url('/icons/arrowFront.svg')]
            bg-contain bg-no-repeat            "
        />
      </button>

      <button
        type="button"
        className="min-w-0 flex-1 truncate"
        onClick={onOpen}
      >
        {text}
      </button>

      <button type="button" onClick={onNext}>
        <span
          aria-hidden="true"
          className="
            block w-6 h-6
            bg-[url('/icons/arrowBack.svg')]
            bg-contain bg-no-repeat            "
        />
      </button>
    </SilverButton>
  );
}
