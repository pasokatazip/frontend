"use client";

import { useEffect, useState } from "react";
import { getLatestSouvenirAction } from "../actions/GetLatestSouvenirAction";
import { getSubscriptionLatestSouvenirAction } from "../actions/GetSubscriptionLatestSouvenirAction";
import type { LatestSouvenir } from "../schemas/SouvenirSchema";

type UseLatestSouvenirProps = {
  petId?: string;
  isSubscribed?: boolean;
  isCurrentPet?: boolean;
};

export function useLatestSouvenir({
  petId,
  isSubscribed = false,
  isCurrentPet = false,
}: UseLatestSouvenirProps = {}) {
  const [souvenir, setSouvenir] = useState<LatestSouvenir | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSouvenir = async () => {
      if (isSubscribed && !isCurrentPet && !petId) return;

      setLoading(true);
      setError(null);

      try {
        const result =
          isSubscribed && !isCurrentPet && petId
            ? await getSubscriptionLatestSouvenirAction(petId)
            : await getLatestSouvenirAction();

        setSouvenir(result.souvenir);
      } catch {
        setSouvenir(null);
        setError("おみやげの取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    void fetchSouvenir();
  }, [petId, isSubscribed, isCurrentPet]);

  return {
    souvenir,
    loading,
    error,
  };
}
