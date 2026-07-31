import type { ComponentType, HTMLAttributes } from "react";
import { getPetFrameUrls } from "@/lib/getPetFrameUrls";
import { PetFrameAnimation } from "./PetFrameAnimation";
import { BabyPetAnimation } from "./animations/BabyPet/BabyPetAnimation";
import { BabyPetWalkAnimation } from "./animations/BabyPetWalk/BabyPetWalkAnimation";
import { BabyPetYoAnimation } from "./animations/BabyPetYo/BabyPetYoAnimation";
import { BrattyPetFourLegsAnimation } from "./animations/BrattyPetFourLegs/BrattyPetFourLegsAnimation";
import { BrattyPetTentacleAnimation } from "./animations/BrattyPetTentacle/BrattyPetTentacleAnimation";
import { BrattyPetTwoLegsAnimation } from "./animations/BrattyPetTwoLegs/BrattyPetTwoLegsAnimation";
import { BrattyPetWalkFourLegsAnimation } from "./animations/BrattyPetWalkFourLegs/BrattyPetWalkFourLegsAnimation";
import { BrattyPetWalkTentacleAnimation } from "./animations/BrattyPetWalkTentacle/BrattyPetWalkTentacleAnimation";
import { BrattyPetWalkTwoLegsAnimation } from "./animations/BrattyPetWalkTwoLegs/BrattyPetWalkTwoLegsAnimation";
import { BrattyPetYoFourLegsAnimation } from "./animations/BrattyPetYoFourLegs/BrattyPetYoFourLegsAnimation";
import { BrattyPetYoTentacleAnimation } from "./animations/BrattyPetYoTentacle/BrattyPetYoTentacleAnimation";
import { BrattyPetYoTwoLegsAnimation } from "./animations/BrattyPetYoTwoLegs/BrattyPetYoTwoLegsAnimation";
import { SpoiledPetFourLegsAnimation } from "./animations/SpoiledPetFourLegs/SpoiledPetFourLegsAnimation";
import { SpoiledPetTentacleAnimation } from "./animations/SpoiledPetTentacle/SpoiledPetTentacleAnimation";
import { SpoiledPetTwoLegsAnimation } from "./animations/SpoiledPetTwoLegs/SpoiledPetTwoLegsAnimation";
import { SpoiledPetWalkFourLegsAnimation } from "./animations/SpoiledPetWalkFourLegs/SpoiledPetWalkFourLegsAnimation";
import { SpoiledPetWalkTentacleAnimation } from "./animations/SpoiledPetWalkTentacle/SpoiledPetWalkTentacleAnimation";
import { SpoiledPetWalkTwoLegsAnimation } from "./animations/SpoiledPetWalkTwoLegs/SpoiledPetWalkTwoLegsAnimation";
import { SpoiledPetYoFourLegsAnimation } from "./animations/SpoiledPetYoFourLegs/SpoiledPetYoFourLegsAnimation";
import { SpoiledPetYoTentacleAnimation } from "./animations/SpoiledPetYoTentacle/SpoiledPetYoTentacleAnimation";
import { SpoiledPetYoTwoLegsAnimation } from "./animations/SpoiledPetYoTwoLegs/SpoiledPetYoTwoLegsAnimation";

type StageAnimationProps = HTMLAttributes<HTMLDivElement> & {
  hueRotate?: number;
  onComplete?: () => void;
  onIntroComplete?: () => void;
};

type PetStageAnimationProps = StageAnimationProps & {
  stageKey: string;
  variant?: "idle" | "walk" | "yo" | "yoWalk";
};

type StageAnimations = Record<
  "idle" | "walk" | "yo" | "yoWalk",
  ComponentType<StageAnimationProps>
>;

type BranchKey = "nishoku" | "shokushu" | "yonshoku";

function createYoWalkAnimation(yoFolderName: string, walkFolderName: string) {
  const introFrameUrls = getPetFrameUrls({
    folderName: yoFolderName,
    frameCount: 4,
  });
  const frameUrls = getPetFrameUrls({
    folderName: walkFolderName,
    frameCount: 4,
  });

  return function YoWalkAnimation(props: StageAnimationProps) {
    return (
      <PetFrameAnimation
        {...props}
        ariaLabel={`${yoFolderName} to ${walkFolderName}`}
        frameUrls={frameUrls}
        introFrameUrls={introFrameUrls}
        loop
      />
    );
  };
}

const babyAnimations: StageAnimations = {
  idle: BabyPetAnimation,
  walk: BabyPetWalkAnimation,
  yo: BabyPetYoAnimation,
  yoWalk: createYoWalkAnimation("BabyPetYo", "BabyPetWalk"),
};

const spoiledAnimations: Record<BranchKey, StageAnimations> = {
  nishoku: {
    idle: SpoiledPetTwoLegsAnimation,
    walk: SpoiledPetWalkTwoLegsAnimation,
    yo: SpoiledPetYoTwoLegsAnimation,
    yoWalk: createYoWalkAnimation(
      "SpoiledPetYoTwoLegs",
      "SpoiledPetWalkTwoLegs",
    ),
  },
  shokushu: {
    idle: SpoiledPetTentacleAnimation,
    walk: SpoiledPetWalkTentacleAnimation,
    yo: SpoiledPetYoTentacleAnimation,
    yoWalk: createYoWalkAnimation(
      "SpoiledPetYoTentacle",
      "SpoiledPetWalkTentacle",
    ),
  },
  yonshoku: {
    idle: SpoiledPetFourLegsAnimation,
    walk: SpoiledPetWalkFourLegsAnimation,
    yo: SpoiledPetYoFourLegsAnimation,
    yoWalk: createYoWalkAnimation(
      "SpoiledPetYoFourLegs",
      "SpoiledPetWalkFourLegs",
    ),
  },
};

const brattyAnimations: Record<BranchKey, StageAnimations> = {
  nishoku: {
    idle: BrattyPetTwoLegsAnimation,
    walk: BrattyPetWalkTwoLegsAnimation,
    yo: BrattyPetYoTwoLegsAnimation,
    yoWalk: createYoWalkAnimation(
      "BrattyPetYoTwoLegs",
      "BrattyPetWalkTwoLegs",
    ),
  },
  shokushu: {
    idle: BrattyPetTentacleAnimation,
    walk: BrattyPetWalkTentacleAnimation,
    yo: BrattyPetYoTentacleAnimation,
    yoWalk: createYoWalkAnimation(
      "BrattyPetYoTentacle",
      "BrattyPetWalkTentacle",
    ),
  },
  yonshoku: {
    idle: BrattyPetFourLegsAnimation,
    walk: BrattyPetWalkFourLegsAnimation,
    yo: BrattyPetYoFourLegsAnimation,
    yoWalk: createYoWalkAnimation(
      "BrattyPetYoFourLegs",
      "BrattyPetWalkFourLegs",
    ),
  },
};

function isBranchKey(value: string): value is BranchKey {
  return value in spoiledAnimations;
}

function getStageAnimations(stageKey: string) {
  if (stageKey === "akago") {
    return babyAnimations;
  }

  const branchKey = stageKey.split("_").at(-1);

  if (!branchKey || !isBranchKey(branchKey)) {
    return babyAnimations;
  }

  return stageKey.startsWith("amae_")
    ? spoiledAnimations[branchKey]
    : brattyAnimations[branchKey];
}

export function PetStageAnimation({
  stageKey,
  variant = "idle",
  ...props
}: PetStageAnimationProps) {
  const Animation = getStageAnimations(stageKey)[variant];

  return <Animation {...props} />;
}
