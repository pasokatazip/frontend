import { apiFetch } from "@/lib/apiFetch";
import { LatestSouvenirSchema } from "../schemas/SouvenirSchema";

export async function getLatestSouvenirApi(token: string) {
  const response = await apiFetch("/pets/me/souvenirs/latest", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return LatestSouvenirSchema.parse(data);
}
