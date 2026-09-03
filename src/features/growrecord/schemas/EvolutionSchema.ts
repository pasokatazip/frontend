import { z } from "zod";

const EvolutionSchema = z.object({
  created_at: z.string(),
  evolution_rule_id: z.number(),
  evolved_at: z.string(),
  id: z.string(),
  primary_status: z.string(),
  stage_id: z.number(),
});

const ExperienceEventSchema = z.object({
  amount: z.number(),
  capped_amount: z.number(),
  created_at: z.string(),
  experience_date: z.string(),
  id: z.string(),
  source_id: z.string(),
  source_type: z.string(),
});

const StageSchema = z.object({
  branch_key: z.string().optional(),
  current: z.boolean(),
  evolved_at: z.string().optional(),
  id: z.number(),
  image_url: z.string(),
  name: z.string(),
  stage_key: z.string(),
  stage_no: z.number(),
  unlocked: z.boolean(),
});

export const PetEvolutionsResponseSchema = z.object({
  color: z.string(),
  current_stage_id: z.number(),
  evolutions: z.array(EvolutionSchema),
  experience_events: z.array(ExperienceEventSchema),
  feed_count: z.number(),
  pet_id: z.string(),
  stages: z.array(StageSchema),
  total_experience: z.number(),
});

export type PetEvolutionsResponse = z.infer<typeof PetEvolutionsResponseSchema>;

export const AllPetsResponseSchema = z.object({
  pets: z.array(
    z.object({
      name: z.string(),
      pet_id: z.string(),
    }),
  ),
});

export type AllPetsResponse = z.infer<typeof AllPetsResponseSchema>;

export type PetSummary = AllPetsResponse["pets"][number];
