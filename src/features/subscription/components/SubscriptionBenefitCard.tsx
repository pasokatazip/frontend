"use client";

import Image from "next/image";
import { useState } from "react";
import { GlassCard } from "@/components/ui/card/GlassCard";
import type { ImageAsset } from "@/features/subscription/components/SubscriptionView";

export type SubscriptionBenefit = {
  image: ImageAsset;
  title: string;
};

type SubscriptionBenefitCardProps = {
  benefits: SubscriptionBenefit[];
};

export function SubscriptionBenefitCard({
  benefits,
}: SubscriptionBenefitCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentBenefit = benefits[currentIndex];

  if (!currentBenefit) {
    return null;
  }

  function selectRelativeBenefit(offset: number) {
    setCurrentIndex(
      (index) => (index + offset + benefits.length) % benefits.length,
    );
  }

  return (
    <GlassCard className="mx-auto mt-5 h-[380px] w-[324px] px-[22px] py-[24px]">
      <h2
        aria-live="polite"
        className="mx-auto w-[280px] text-center text-base leading-6 font-normal tracking-normal text-[#4C4F5E]"
      >
        {currentBenefit.title}
      </h2>

      <Image
        key={currentBenefit.image.src}
        src={currentBenefit.image.src}
        alt={currentBenefit.image.alt}
        width={currentBenefit.image.width}
        height={currentBenefit.image.height}
        priority
        className="mx-auto mt-3 h-[270px] w-[270px] object-cover"
      />

      <div className="mx-auto mt-5 flex h-[24px] w-[280px] items-center justify-between px-[clamp(0.25rem,2vw,0.5rem)] text-[#4C4F5E]">
        <button
          aria-label="前"
          className="text-2xl leading-none font-normal"
          onClick={() => selectRelativeBenefit(-1)}
          type="button"
        >
          ‹
        </button>

        <div className="flex items-center gap-[clamp(0.75rem,4vw,1rem)]">
          {benefits.map((benefit, index) => (
            <button
              aria-label={`${benefit.title}を表示`}
              aria-pressed={index === currentIndex}
              className={`h-2 w-2 rounded-full ${
                index === currentIndex ? "bg-[#0080F7]" : "bg-white"
              }`}
              key={benefit.image.src}
              onClick={() => setCurrentIndex(index)}
              type="button"
            />
          ))}
        </div>

        <button
          aria-label="次"
          className="text-2xl leading-none font-normal"
          onClick={() => selectRelativeBenefit(1)}
          type="button"
        >
          ›
        </button>
      </div>
    </GlassCard>
  );
}
