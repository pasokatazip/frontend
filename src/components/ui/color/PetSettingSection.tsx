"use client";

import Image from "next/image";
import { ReactNode } from "react";
import { GlassCard } from "@/components/ui/card/GlassCard";
import { TextInput } from "@/components/ui/input/TextInput";
import { BabyPetAnimation } from "../pet/BabyPetAnimation";

type PetSettingSectionProps = {
  hue: number;
  onHueChange: (value: number) => void;
  children?: ReactNode;
};

export function PetSettingSection({
  hue,
  onHueChange,
  children,
}: PetSettingSectionProps) {
  return (
    <GlassCard className="relative mt-3 grid min-h-[11.5rem] grid-cols-[7rem_1fr] items-center gap-3 overflow-hidden px-4 py-6 sm:grid-cols-[8.5rem_1fr] sm:gap-5 sm:px-8 sm:py-7">
      <BabyPetAnimation
        hueRotate={hue}
        className="h-full w-full drop-shadow-[0_0.875rem_1.125rem_rgba(20,154,125,0.28)]"
      />
      <div>
        <label
          htmlFor="pet-name"
          className="mb-2 block text-base text-[#4C4F5E]"
        >
          名前
        </label>
        <TextInput
          id="pet-name"
          aria-label="ペット名"
          defaultValue="ペット名"
        />
      </div>
      <div className="relative mt-5">
        <label
          htmlFor="pet-color"
          className="mb-2 block text-sm text-[#4C4F5E]"
        >
          色変更
        </label>
        <div
          className="pointer-events-none absolute top-[34px] h-2 w-full rounded-full"
          style={{
            background:
              "linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red)",
          }}
        />
        <input
          type="range"
          min={0}
          max={360}
          value={hue}
          onChange={(e) => onHueChange(Number(e.target.value))}
          className="color-slider relative h-3 w-full cursor-pointer appearance-none bg-transparent"
        />
      </div>

      {children}
    </GlassCard>
  );
}
