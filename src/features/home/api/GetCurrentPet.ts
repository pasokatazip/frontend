import { z } from "zod";
import { apiFetch } from "@/lib/apiFetch";

const currentPetSchema = z.object({
  color: z.string().min(1),
  current_group: z.record(z.string(), z.unknown()).nullable(),
  id: z.string().min(1),
  name: z.string().min(1),
});

export type CurrentPet = z.infer<typeof currentPetSchema>;

export async function getCurrentPet(token: string) {
  const response = await apiFetch("/pets/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  return currentPetSchema.parse(await response.json());
}
