import { GlassCard } from "@/components/ui/card/GlassCard";
import Image from "next/image";
import clsx from "clsx";
import type { Souvenir } from "@/types/souvenir";

type Props = {
  souvenirs: Souvenir[];
};

export function SouvenirBox({ souvenirs }: Props) {
  return (
    <GlassCard className="w-full rounded-xl bg-white/30 p-5 text-[10px] text-[#4C4F5E]">
      <p>おみやげ</p>
      <div className="mt-2 grid grid-cols-3">
        {souvenirs.map((souvenir, index) => (
          <Image
            key={souvenir.id}
            src={souvenir.image}
            alt=""
            className={clsx(
              "object-cover",
              index === 0 && "justify-self-start",
              index === 1 && "justify-self-center",
              index === 2 && "justify-self-end",
            )}
            width={50}
            height={50}
            unoptimized
          />
        ))}
      </div>
    </GlassCard>
  );
}
