"use client";

import { usePetProgressHydration } from "@/hooks/usePetProgressHydration";
import { usePetProgressStore } from "@/stores/usePetProgressStore";
import type { PetSnapshot } from "@/types/pet";

const defaultPetSnapshot: PetSnapshot = {
  petId: "",
  petName: "ペット",
  currentStageKey: "",
  currentStageNo: 1,
  nextStageKey: "",
  stageId: 1,
  canEvolve: false,
};

export function usePetSession() {
  const petSnapshot = usePetProgressStore((state) => state.snapshot);

  usePetProgressHydration();

  if (!petSnapshot) {
    return defaultPetSnapshot;
  }

  return {
    ...petSnapshot,
    nextStageKey: petSnapshot.nextStageKey ?? "",
  } satisfies PetSnapshot;
}
