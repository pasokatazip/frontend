import { apiFetch } from "@/lib/apiFetch";

export type EvolutionItem = {
  id: number;
  pet_id: string;
  stage_id: number;
  branch_key: string;
  created_at: string;
};

export type EvolutionStageItem = {
  branch_key: string;
  current: boolean;
  evolved_at: string;
  id: number;
  image_url: string;
  name: string;
  stage_key: string;
  stage_no: number;
  unlocked: boolean;
};

export type EvolutionResponse = {
  current_stage_id: number;
  evolutions: EvolutionItem[];
  pet_id: string;
  stages: EvolutionStageItem[];
};

export async function getEvolutionsApi(
  token: string,
): Promise<EvolutionResponse> {
  const res = await apiFetch(`/pets/evolutions`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.json();
}
