"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { CurrentPet } from "@/features/home/api/GetCurrentPet";
import type { EvolutionStatus } from "@/features/home/api/GetEvolutionStatus";
import { usePetProgressStore } from "@/stores/usePetProgressStore";

type HomeProgressControllerProps = {
  evolutionStatus: EvolutionStatus;
  pet: CurrentPet;
};

const departureStageId = 3;

export function HomeProgressController({
  evolutionStatus,
  pet,
}: HomeProgressControllerProps) {
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    async function synchronizeProgress() {
      await usePetProgressStore.persist.rehydrate();

      if (cancelled) {
        return;
      }

      const { setEvolutionFlow, setSnapshot, snapshot } =
        usePetProgressStore.getState();

      const nextSnapshot = {
        canEvolve: evolutionStatus.canEvolve,
        color: pet.color,
        currentStageKey: evolutionStatus.currentStageKey,
        currentStageNo: evolutionStatus.currentStageNo,
        nextStageKey: evolutionStatus.nextStageKey,
        petId: pet.id,
        petName: pet.name,
        stageId: pet.stageId,
      };

      const isSamePet = snapshot?.petId === pet.id;
      const stageChanged =
        isSamePet && nextSnapshot.stageId !== snapshot.stageId;
      const hasChanged =
        !isSamePet ||
        snapshot.canEvolve !== nextSnapshot.canEvolve ||
        snapshot.color !== nextSnapshot.color ||
        snapshot.currentStageKey !== nextSnapshot.currentStageKey ||
        snapshot.currentStageNo !== nextSnapshot.currentStageNo ||
        snapshot.nextStageKey !== nextSnapshot.nextStageKey ||
        snapshot.petName !== nextSnapshot.petName ||
        snapshot.stageId !== nextSnapshot.stageId;

      if (!hasChanged) {
        return;
      }

      const reachedDeparture =
        stageChanged &&
        nextSnapshot.currentStageNo === departureStageId &&
        nextSnapshot.currentStageNo > snapshot.currentStageNo;

      setSnapshot(nextSnapshot);

      if (reachedDeparture) {
        setEvolutionFlow();
        router.replace("/Depart");
        return;
      }

      if (stageChanged) {
        setEvolutionFlow({
          fromStageKey: snapshot.currentStageKey,
          step: "grow",
          toStageKey: nextSnapshot.currentStageKey,
        });
        router.replace("/Grow");
      }
    }

    void synchronizeProgress();

    return () => {
      cancelled = true;
    };
  }, [evolutionStatus, pet.color, pet.id, pet.name, pet.stageId, router]);

  return null;
}
