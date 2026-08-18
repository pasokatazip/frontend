"use client";

import { useEffect, useState } from "react";
import { usePetProgressStore } from "@/stores/usePetProgressStore";

export function usePetProgressHydration() {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      try {
        await usePetProgressStore.persist.rehydrate();
      } catch {
        usePetProgressStore.getState().reset();
      }

      if (!cancelled) {
        setHasHydrated(true);
      }
    }

    void hydrate();

    return () => {
      cancelled = true;
    };
  }, []);

  return hasHydrated;
}
