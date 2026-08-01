import { z } from "zod";
import { apiFetch } from "@/lib/apiFetch";

const currentGroupSchema = z.object({
  display_name: z.string().min(1),
  group_key: z.string().min(1),
  id: z.number().int().positive(),
});

const departureSchema = z
  .object({
    can_depart: z.boolean(),
    eligible_at: z.string().min(1).optional(),
    scheduled_departure_at: z.string().min(1).optional(),
    status: z.string().min(1),
  })
  .transform(
    ({ can_depart, eligible_at, scheduled_departure_at, ...departure }) => ({
      ...departure,
      canDepart: can_depart,
      eligibleAt: eligible_at,
      scheduledDepartureAt: scheduled_departure_at,
    }),
  );

const currentPetSchema = z
  .object({
    color: z.string().min(1),
    current_group: currentGroupSchema.nullable(),
    current_stage_id: z.number().int().nonnegative(),
    departure: departureSchema.nullable(),
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
