import { z } from "zod";
import { apiFetch } from "@/lib/apiFetch";

const latestPetSouvenirItemSchema = z.object({
  displayName: z.string().min(1),
  foundAt: z.string().min(1),
  id: z.string().min(1),
  imageURL: z.string(),
  reported: z.boolean(),
});

const latestPetSouvenirSchema = z.object({
  souvenir: latestPetSouvenirItemSchema,
});

export type LatestPetSouvenir = z.infer<typeof latestPetSouvenirItemSchema>;

export async function getLatestPetSouvenir(token: string) {
  const response = await apiFetch("/pets/me/souvenirs/latest", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  return latestPetSouvenirSchema.parse(await response.json());
}
