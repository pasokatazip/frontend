"use client";

import { useEffect, useState } from "react";
import { getEvolutionsAction } from "../actions/getEvolutionsAction";
import { EvolutionResponse } from "../api/getEvolutionsApi";

export function usePetEvolutions() {
  const [data, setData] = useState<EvolutionResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const result = await getEvolutionsAction();
        setData(result);
      } catch (error) {
        console.error("進化履歴の取得失敗:", error);
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, []);

  return { data, loading };
}
