"use client";

import { clsx } from "clsx";
import Image from "next/image";
import { colorCodeToHueRotate } from "@/utils/colorCodeToHueRotate";
import { PetStageAnimation } from "@/components/ui/pet/PetStageAnimation";
import { PetSnapshot } from "@/types/pet";

type GetMyPetProps = {
  className?: string;
  facing?: 1 | -1;
  onAnimationComplete?: () => void;
  pet: PetSnapshot;
  showYoImage?: boolean;
  variant?: "idle" | "walk" | "yo";
  size?: "sm" | "md" | "lg";
};

const sizeClasses = {
  sm: "h-16 w-20",
  md: "h-28 w-32",
  lg: "h-[8.75rem] w-[10rem]",
};

export function GetMyPet({
  className,
  facing = 1,
  onAnimationComplete,
  pet,
  showYoImage = false,
  variant = "idle",
  size = "md",
}: GetMyPetProps) {
  const { petName, currentStageKey, color } = pet;

  const hueRotate = color ? colorCodeToHueRotate(color) : 0;

  return (
    <div
      className={clsx("relative inline-block", sizeClasses[size], className)}
    >
      {showYoImage ? (
        <Image
          src="/images/home/yo.png"
          alt=""
          aria-hidden="true"
          width={64}
          height={40}
          className="pointer-events-none absolute -top-3 left-1/2 z-20 h-8 w-[3.25rem] -translate-x-1/2 object-contain"
        />
      ) : null}
      <div
        className="relative h-full w-full drop-shadow-[0_0.875rem_1.125rem_rgba(20,154,125,0.28)]"
        style={{ transform: `scaleX(${facing})` }}
      >
        <PetStageAnimation
          aria-label={petName}
          hueRotate={hueRotate}
          className="absolute inset-0 h-full w-full"
          onComplete={onAnimationComplete}
          stageKey={currentStageKey}
          variant={variant}
        />
      </div>
    </div>
  );
}
