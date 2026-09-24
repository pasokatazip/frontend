"use client";

import { useEffect, useState } from "react";
import { getSubscriptionPetEvolutionsAction } from "../actions/GetSubscriptionPetEvolutionsAction";
import { getEvolutionsAction } from "../actions/getEvolutionsAction";

type PetEvolutionsData = {
  pet_id: string;
  created_at: string;
  color?: string;

  stages: {
    branch_key?: string;
    current: boolean;
    evolved_at?: string;
    id: number;
    image_url: string;
    name: string;
    stage_key: string;
    stage_no: number;
    unlocked: boolean;
  }[];

  evolutions: {
    created_at: string;
    stage_id: number;
    evolved_at: string;
  }[];
};

type UsePetEvolutionsProps = {
  petId?: string;
  isSubscribed?: boolean;
};

export function usePetEvolutions({
  petId,
  isSubscribed = false,
}: UsePetEvolutionsProps = {}) {
  const [data, setData] = useState<PetEvolutionsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvolutions = async () => {
      setLoading(true);
      setError(null);
      setData(null);

      try {
        if (isSubscribed && petId) {
          const result = await getSubscriptionPetEvolutionsAction(petId);

          setData({
            pet_id: result.pet_id,
            created_at: result.created_at,
            color: result.color,
            stages: result.stages,
            evolutions: result.evolutions,
          });
        } else {
          const result = await getEvolutionsAction();

          setData({
            pet_id: result.pet_id,
            created_at: result.created_at,
            stages: result.stages,
            evolutions: result.evolutions,
          });
        }
      } catch {
        setError("データの取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    void fetchEvolutions();
  }, [petId, isSubscribed]);

  return {
    data,
    loading,
    error,
  };
}
