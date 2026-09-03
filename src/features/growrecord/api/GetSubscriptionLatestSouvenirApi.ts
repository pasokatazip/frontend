import { apiFetch } from "@/lib/apiFetch";
import { LatestSouvenirSchema } from "../schemas/SouvenirSchema";

export async function getSubscriptionLatestSouvenirApi(
  petId: string,
  token: string,
) {
  const response = await apiFetch(`/subsc/pets/${petId}/souvenirs/latest`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return LatestSouvenirSchema.parse(data);
}
