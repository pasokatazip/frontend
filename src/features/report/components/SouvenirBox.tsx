import { GlassCard } from "@/components/ui/card/GlassCard";
import Image from "next/image";
import type { Souvenir } from "@/types/souvenir";

type Props = {
  souvenirs: Souvenir[];
};

export function SouvenirBox({ souvenirs }: Props) {
  return (
    <GlassCard className="w-full rounded-xl bg-white/30 p-3 text-[10px] text-[#4C4F5E]">
      <p>おみやげ</p>
      <div className="flex justify-around">
        {souvenirs.map((souvenir) => (
          <Image
            key={souvenir.id}
            src={souvenir.image}
            alt=""
            className="object-cover"
            width={50}
            height={50}
          />
        ))}
      </div>
    </GlassCard>
  );
}
