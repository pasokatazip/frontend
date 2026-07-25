"use client";

import { useEffect, useState } from "react";

type PetSessionSnapshot = {
  petId: string;
  petName: string;
  currentStageKey: string;
  currentStageNo: number;
  nextStageKey: string;
  stageId: number;
  canEvolve: boolean;
  color?: string;
};

const defaultPetSnapshot: PetSessionSnapshot = {
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
    useState<PetSessionSnapshot>(defaultPetSnapshot);

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
    } catch (error) {
      console.error("セッションからのペット情報取得に失敗しました", error);
    }
  }, []);

  return petSnapshot;
}
