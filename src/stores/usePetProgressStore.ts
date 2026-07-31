"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { StateStorage } from "zustand/middleware";

function getSessionStorage() {
  if (typeof window === "undefined") {
    return;
  }

  return window.sessionStorage;
}

const petProgressStorage: StateStorage = {
  getItem(name) {
    const storage = getSessionStorage();

    if (!storage) {
      return null;
    }

    return storage.getItem(name);
  },
  removeItem(name) {
    const storage = getSessionStorage();

    if (!storage) {
      return;
    }

    storage.removeItem(name);
  },
  setItem(name, value) {
    const storage = getSessionStorage();

    if (!storage) {
      return;
    }

    storage.setItem(name, value);
  },
};

type PetProgressSnapshot = {
  canEvolve: boolean;
  color?: string;
  currentStageKey: string;
  currentStageNo: number;
  nextStageKey?: string;
  petId: string;
  petName: string;
  stageId: number;
};

type EvolutionFlow = {
  fromStageKey: string;
  step: "complete" | "grow";
  toStageKey: string;
};

type PetProgressState = {
  evolutionFlow?: EvolutionFlow;
  reset: () => void;
  setEvolutionFlow: (flow?: EvolutionFlow) => void;
  setSnapshot: (snapshot: PetProgressSnapshot) => void;
  snapshot?: PetProgressSnapshot;
};

export const usePetProgressStore = create<PetProgressState>()(
  persist(
    (set) => ({
      evolutionFlow: undefined,
      reset: () =>
        set({
          evolutionFlow: undefined,
          snapshot: undefined,
        }),
      setEvolutionFlow: (evolutionFlow) => set({ evolutionFlow }),
      setSnapshot: (snapshot) => set({ snapshot }),
      snapshot: undefined,
    }),
    {
      name: "pet-evolution-progress-v4",
      skipHydration: true,
      storage: createJSONStorage(() => petProgressStorage),
    },
  ),
);
