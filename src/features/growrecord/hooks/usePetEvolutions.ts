"use client";

import { useEffect, useState } from "react";
import { getEvolutionsAction } from "../actions/getEvolutionsAction";
import { EvolutionResponse } from "../api/getEvolutionsApi";
import { logClientError } from "../actions/logClientError";

export function usePetEvolutions() {
  const [data, setData] = useState<EvolutionResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const result = await getEvolutionsAction();
        setData(result);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);

        void logClientError("進化履歴の取得失敗", errorMessage);

        setError("データの取得に失敗しました");
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  return { data, loading, error };
}
