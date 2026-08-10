import { apiFetch } from "@/lib/apiFetch";

export type EvolutionResponse = {
  current_stage_id: number;
  evolutions: any[];
  pet_id: string;
  stages: {
    branch_key: string;
    current: boolean;
    evolved_at: string;
    id: number;
    image_url: string;
    name: string;
    stage_key: string;
    stage_no: number;
    unlocked: boolean;
  }[];
};

export async function getEvolutionsApi(token: string) {
  const res = await apiFetch(`/pets/evolutions`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.json();
}
