"use client";

import type { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import type { PetSnapshot } from "@/types/pet";
import {
  type GatheringPetState,
  TutorialPetGatheringView,
} from "./TutorialPetGatheringView";

type TutorialPetGatheringContainerProps = {
  doctorImage: StaticImageData;
  effectImage: StaticImageData;
  onBack: () => void;
  onNext: () => void;
  pet: PetSnapshot;
};

const companionPetOne = {
  canEvolve: false,
  currentStageKey: "baby",
  currentStageNo: 1,
  nextStageKey: "",
  petId: "tutorial-companion-pet-1",
  petName: "ペット",
  stageId: 1,
} satisfies PetSnapshot;

const companionPetTwo = {
  ...companionPetOne,
  petId: "tutorial-companion-pet-2",
} satisfies PetSnapshot;

const lastYoPhase = 5;
const completePhase = 6;
const phaseSchedule = [
  { delay: 300, phase: 1 },
  { delay: 5_800, phase: 2 },
  { delay: 6_700, phase: 3 },
  { delay: 7_600, phase: 4 },
  { delay: 13_100, phase: lastYoPhase },
];

export function TutorialPetGatheringContainer({
  doctorImage,
  effectImage,
  onBack,
  onNext,
  pet,
}: TutorialPetGatheringContainerProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase(completePhase);
      return;
    }

    const timers = phaseSchedule.map(({ delay, phase: nextPhase }) =>
      window.setTimeout(() => setPhase(nextPhase), delay),
    );

    return () => timers.forEach(window.clearTimeout);
  }, []);

  const pets: GatheringPetState[] = [
    {
      facing: 1,
      pet,
      showYoImage: phase >= 3,
      variant: phase >= 3 ? "yo" : "idle",
      visible: true,
    },
    {
      facing: phase >= 2 ? 1 : -1,
      pet: companionPetOne,
      showYoImage: phase >= 2,
      variant: phase >= 2 ? "yo" : "walk",
      visible: phase >= 1,
    },
    {
      facing: 1,
      onAnimationComplete:
        phase === lastYoPhase ? () => setPhase(completePhase) : undefined,
      pet: companionPetTwo,
      showYoImage: phase >= lastYoPhase,
      variant: phase >= lastYoPhase ? "yo" : "walk",
      visible: phase >= 4,
    },
  ];

  return (
    <TutorialPetGatheringView
      doctorImage={doctorImage}
      effectImage={effectImage}
      isComplete={phase === completePhase}
      onBack={onBack}
      onNext={onNext}
      pets={pets}
    />
  );
}
