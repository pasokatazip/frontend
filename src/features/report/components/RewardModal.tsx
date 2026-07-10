import Image from "next/image";
import type { Souvenir } from "@/types/souvenir";

type Props = {
  open: boolean;
  onClose: () => void;
  souvenirs: Souvenir[];
};

export function RewardModal({ open, onClose, souvenirs }: Props) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="relative m-3 text-[#4C4F5E] text-[16px]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image src="/images/getBubble.png" alt="" width={400} height={400} />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3.5">
          <p>今日のおみやげ</p>
          <div className="flex gap-2.5">
            {souvenirs.map((souvenir) => (
              <div key={souvenir.id} className="flex flex-col items-center">
                <Image
                  src={souvenir.image}
                  alt={souvenir.name}
                  width={80}
                  height={80}
                  className="object-contain"
                />
                <p className="mt-2 text-center text-[10px]">{souvenir.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
