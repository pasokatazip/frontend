"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { departPetAction } from "@/features/depart/actions/DepartPetAction";
import type { LatestPetSouvenir } from "@/features/depart/api/GetLatestPetSouvenir";
import { usePetProgressStore } from "@/stores/usePetProgressStore";
import { DepartView, type DepartStep } from "./DepartView";

export type DepartPet = {
  color: string;
  currentStageKey: string;
  latestSouvenir: LatestPetSouvenir;
  name: string;
};

type DepartControllerProps = { pet: DepartPet };

const nextSteps: Record<Exclude<DepartStep, "NextSetup">, DepartStep> = {
  Convey: "Message",
  LastSouvenir: "NextSetup",
  Message: "LastSouvenir",
};

export function DepartController({ pet }: DepartControllerProps) {
  const router = useRouter();
  const [step, setStep] = useState<DepartStep>("Convey");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>();

  async function handleNext() {
    if (step !== "NextSetup") {
      setStep(nextSteps[step]);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(undefined);

    const result = await departPetAction();

    setIsSubmitting(false);
    if (!result.success) {
      setSubmitError(result.error);
      return;
    }

    usePetProgressStore.getState().reset();
    router.replace(result.destination);
    router.refresh();
  }

  return (
    <DepartView
      isSubmitting={isSubmitting}
      latestSouvenir={pet.latestSouvenir}
      name={pet.name}
      onNext={() => void handleNext()}
      petColor={pet.color}
      petCurrentStageKey={pet.currentStageKey}
      step={step}
      submitError={submitError}
    />
  );
}
