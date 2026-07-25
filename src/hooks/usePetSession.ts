"use client";

import { useEffect, useState } from "react";
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
  const [petSnapshot, setPetSnapshot] =
    useState<PetSnapshot>(defaultPetSnapshot);

  useEffect(() => {
    try {
      const sessionDataRaw = sessionStorage.getItem(
        "pet-evolution-progress-v4",
      );
      if (sessionDataRaw) {
        const parsed = JSON.parse(sessionDataRaw);
        const snapshot = parsed?.state?.snapshot;
        if (snapshot) {
          setPetSnapshot(snapshot);
        }
      }
    } catch {
      setPetSnapshot(defaultPetSnapshot);
    }
  }, []);

  return petSnapshot;
}
