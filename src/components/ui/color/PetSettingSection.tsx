"use client";

import { ReactNode } from "react";
import { clsx } from "clsx";
import { GlassCard } from "@/components/ui/card/GlassCard";
import { TextInput } from "@/components/ui/input/TextInput";
import { BabyPetAnimation } from "../pet/BabyPetAnimation";

type PetSettingSectionProps = {
  compact?: boolean;
  hue: number;
  name?: string;
  onHueChange: (value: number) => void;
  onNameChange?: (value: string) => void;
  children?: ReactNode;
};

export function PetSettingSection({
  compact = false,
  hue,
  name,
  onHueChange,
  onNameChange,
  children,
}: PetSettingSectionProps) {
  return (
    <GlassCard
      className={clsx(
        "relative mt-3 grid items-center overflow-hidden",
        compact
          ? "min-h-[9.5rem] grid-cols-[5.5rem_1fr] gap-2 px-3 py-4"
          : "min-h-[11.5rem] grid-cols-[7rem_1fr] gap-3 px-4 py-6 sm:grid-cols-[8.5rem_1fr] sm:gap-5 sm:px-8 sm:py-7",
      )}
    >
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
          className={compact ? "h-11" : undefined}
          defaultValue={name === undefined ? "ペット名" : undefined}
          onChange={(event) => onNameChange?.(event.target.value)}
          value={name}
        />
      </div>
      <div className={clsx("relative col-span-2", compact ? "mt-3" : "mt-5")}>
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
          id="pet-color"
          aria-label="ペットの色"
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
