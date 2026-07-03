import Image from "next/image";
import { GlassCard } from "@/components/ui/card/GlassCard";
import type { ImageAsset } from "@/features/subscription/components/SubscriptionView";

type SubscriptionBenefitCardProps = {
  superYoYoImage: ImageAsset;
};

export function SubscriptionBenefitCard({
  superYoYoImage,
}: SubscriptionBenefitCardProps) {
  return (
    <GlassCard className="mx-auto mt-5 h-[380px] w-[324px] px-[22px] py-[24px]">
      <h2 className="mx-auto w-[280px] text-center text-base leading-6 font-normal tracking-normal text-[#4C4F5E]">
        過去レポート全開放
      </h2>

      <Image
        src={superYoYoImage.src}
        alt={superYoYoImage.alt}
        width={superYoYoImage.width}
        height={superYoYoImage.height}
        priority
        className="mx-auto mt-3 h-[270px] w-[270px] object-cover"
      />

      <div className="mx-auto mt-5 flex h-[24px] w-[280px] items-center justify-between px-[clamp(0.25rem,2vw,0.5rem)] text-[#4C4F5E]">
        <button
          aria-label="前"
          className="text-2xl leading-none font-normal"
          type="button"
        >
          ‹
        </button>

        <div className="flex items-center gap-[clamp(0.75rem,4vw,1rem)]">
          <span className="h-2 w-2 rounded-full bg-[#0080F7]" />
          <span className="h-2 w-2 rounded-full bg-white" />
          <span className="h-2 w-2 rounded-full bg-white" />
        </div>

        <button
          aria-label="次"
          className="text-2xl leading-none font-normal"
          type="button"
        >
          ›
        </button>
      </div>
    </GlassCard>
  );
}
