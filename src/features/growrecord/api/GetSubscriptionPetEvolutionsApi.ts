import { apiFetch } from "@/lib/apiFetch";
import { PetEvolutionsResponseSchema } from "../schemas/EvolutionSchema";

export async function getSubscriptionPetEvolutionsApi(
  petId: string,
  token: string,
) {
  const response = await apiFetch(`/subsc/pets/${petId}/evolutions`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return PetEvolutionsResponseSchema.parse(data);
}
