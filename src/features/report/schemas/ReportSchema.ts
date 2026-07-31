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

export const ReportsResponseSchema = z.object({
  reports: z.array(ReportSchema),
});

export type Report = z.infer<typeof ReportSchema>;
