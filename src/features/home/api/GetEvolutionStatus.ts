import { z } from "zod";
import { apiFetch } from "@/lib/apiFetch";

const evolutionStageSchema = z.object({
  stage_key: z.string().min(1),
  stage_no: z.number().int().nonnegative(),
});

const evolutionStatusSchema = z
  .object({
    can_evolve: z.boolean(),
    current_stage: evolutionStageSchema,
    next_stages: z.array(
      z.object({
        selected_for_pet: z.boolean(),
        to_stage: evolutionStageSchema,
      }),
    ),
    pet_id: z.string().min(1),
  })
  .transform((status) => ({
    canEvolve: status.can_evolve,
    currentStageKey: status.current_stage.stage_key,
    currentStageNo: status.current_stage.stage_no,
    nextStageKey: status.next_stages.find((stage) => stage.selected_for_pet)
      ?.to_stage.stage_key,
    petId: status.pet_id,
  }));

export type EvolutionStatus = z.infer<typeof evolutionStatusSchema>;

export async function getEvolutionStatus(token: string) {
  const response = await apiFetch("/pets/evolution-status", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  return evolutionStatusSchema.parse(await response.json());
}
