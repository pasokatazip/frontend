"use client";

import { useEffect, useState } from "react";
import { usePetProgressStore } from "@/stores/usePetProgressStore";

export function usePetProgressHydration() {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      await usePetProgressStore.persist.rehydrate();

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
