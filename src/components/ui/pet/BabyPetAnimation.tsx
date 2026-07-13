"use client";

import { babyPetFrameUrls } from "@/config/babyPetFrameUrls";
import {
  PetFrameAnimation,
  type PetFrameAnimationProps,
} from "./PetFrameAnimation";

type BabyPetAnimationProps = Omit<
  PetFrameAnimationProps,
  "ariaLabel" | "frameUrls"
>;

export function BabyPetAnimation(props: BabyPetAnimationProps) {
  return (
    <PetFrameAnimation
      ariaLabel="ベビーペット"
      frameUrls={babyPetFrameUrls}
      {...props}
    />
  );
}
