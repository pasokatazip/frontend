"use client";

import { clsx } from "clsx";
import { colorCodeToHueRotate } from "@/utils/colorCodeToHueRotate";
import { PetStageAnimation } from "@/components/ui/pet/PetStageAnimation";
import { PetSnapshot } from "@/types/pet";

type GetMyPetProps = {
  className?: string;
  pet: PetSnapshot;
  variant?: "idle" | "yo";
  size?: "sm" | "md" | "lg";
};

const sizeClasses = {
  sm: "h-16 w-20",
  md: "h-28 w-32",
  lg: "h-[8.75rem] w-[10rem]",
};

export function GetMyPet({
  className,
  pet,
  variant = "idle",
  size = "md",
}: GetMyPetProps) {
  const { petName, currentStageKey, color } = pet;

  const hueRotate = color ? colorCodeToHueRotate(color) : 0;

  return (
    <div
      className={clsx("relative inline-block", sizeClasses[size], className)}
    >
      <div className="relative h-full w-full drop-shadow-[0_0.875rem_1.125rem_rgba(20,154,125,0.28)]">
        <PetStageAnimation
          aria-label={petName}
          hueRotate={hueRotate}
          className="absolute inset-0 h-full w-full"
          stageKey={currentStageKey}
          variant={variant}
        />
      </div>
    </div>
  );
}
