import { apiFetch } from "@/lib/apiFetch";
import { AllPetsResponseSchema } from "../schemas/EvolutionSchema";

export async function getAllPetsApi(token: string) {
  const response = await apiFetch("/subsc/allPets", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return AllPetsResponseSchema.parse(data);
}
