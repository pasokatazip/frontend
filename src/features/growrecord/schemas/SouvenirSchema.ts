import { z } from "zod";

export const LatestSouvenirSchema = z.object({
  souvenir: z
    .object({
      displayName: z.string(),
      foundAt: z.string(),
      id: z.string(),
      imageURL: z.string(),
      reported: z.boolean(),
    })
    .nullable(),
});

export type LatestSouvenirResponse = z.infer<typeof LatestSouvenirSchema>;

export type LatestSouvenir = NonNullable<LatestSouvenirResponse["souvenir"]>;
