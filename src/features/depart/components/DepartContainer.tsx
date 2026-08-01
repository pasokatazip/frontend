"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { departPetAction } from "@/features/depart/actions/DepartPetAction";
import { usePetProgressStore } from "@/stores/usePetProgressStore";
import { DepartView, type DepartStep } from "./DepartView";

export type DepartPet = {
  color: string;
  currentStageKey: string;
  name: string;
};

type DepartContainerProps = { pet: DepartPet };

const nextSteps: Record<Exclude<DepartStep, "NextSetup">, DepartStep> = {
  Convey: "Message",
  Message: "NextSetup",
};

export function DepartContainer({ pet }: DepartContainerProps) {
  const router = useRouter();
  const [step, setStep] = useState<DepartStep>("Convey");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>();

  async function handleNext() {
    if (step === "NextSetup") {
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
      return;
    }

    setStep(nextSteps[step]);
  }

  return (
    <DepartView
      isSubmitting={isSubmitting}
      name={pet.name}
      onNext={() => void handleNext()}
      petColor={pet.color}
      petCurrentStageKey={pet.currentStageKey}
      step={step}
      submitError={submitError}
    />
  );
}
