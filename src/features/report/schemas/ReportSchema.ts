import { z } from "zod";

export const ReportSchema = z.object({
  id: z.string(),
  petID: z.string(),
  createdAt: z.string(),
  gossip: z.string(),
  groupName: z.string(),
  hourSlot: z.number(),
  rumors: z.array(z.string()).nullable(),
  souvenirs: z.array(
    z.object({
      id: z.string(),
      displayName: z.string(),
      imageURL: z.string(),
    }),
  ),
});

export const PetReportSchema = z.object({
  color: z.string(),
  created_at: z.string(),
  current_stage_key: z.string(),
  current_stage_no: z.number(),
  is_deleted: z.boolean(),
  name: z.string(),
  pet_id: z.string(),
});

export const ReportsResponseSchema = z.object({
  hasPraised: z.boolean(),
  reports: z.array(ReportSchema),
});

export const SubscriptionReportsResponseSchema = z.object({
  hasPraised: z.boolean(),
  pet: PetReportSchema,
  reports: z.array(ReportSchema),
});

export type Report = z.infer<typeof ReportSchema>;
export type PetReport = z.infer<typeof PetReportSchema>;
