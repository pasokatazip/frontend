import { z } from "zod";
import { apiFetch } from "@/lib/apiFetch";

const currentGroupSchema = z.object({
  display_name: z.string().min(1),
  group_key: z.string().min(1),
  id: z.number().int().positive(),
});

const currentPetSchema = z
  .object({
    color: z.string().min(1),
    current_group: currentGroupSchema.nullable(),
    current_stage_id: z.number().int().nonnegative(),
    id: z.string().min(1),
    name: z.string().min(1),
  })
  .transform(({ current_stage_id, ...pet }) => ({
    ...pet,
    stageId: current_stage_id,
  }));

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
