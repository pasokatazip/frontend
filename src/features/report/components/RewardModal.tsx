import { GetItemBubble } from "@/components/ui/bubble/GetItemBubble";
import type { Souvenir } from "@/types/souvenir";
import clsx from "clsx";

type Props = {
  open: boolean;
  onClose: () => void;
  souvenirs: Souvenir[];
};

export function RewardModal({ open, onClose, souvenirs }: Props) {
  return (
    <div
      aria-hidden={!open}
      className={clsx(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/40 transition-opacity duration-200 ease-out motion-reduce:transition-none",
        open ? "opacity-100" : "pointer-events-none opacity-0",
      )}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal={open ? "true" : undefined}
        aria-label="今日のおみやげ"
        className="m-3 w-full max-w-[25.5rem]"
        onClick={(e) => e.stopPropagation()}
      >
        <GetItemBubble text="今日のおみやげ" souvenirs={souvenirs} />
      </div>
    </div>
  );
}
