import { z } from "zod";

export const petSetupSchema = z.object({
  hueRotate: z.number().min(0).max(360),
  name: z.string().trim().min(1).max(30),
});

export type PetSetupFormValues = z.infer<typeof petSetupSchema>;
