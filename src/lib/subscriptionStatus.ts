import { z } from "zod";
import { apiFetch } from "@/lib/apiFetch";

const purchaseStatusResponseSchema = z
  .object({
    purchased: z.boolean(),
  })
  .transform(({ purchased }) => ({
    active: purchased,
  }));

// settingでも使うからsubscriptionStatusに切り出した
export type SubscriptionStatus = z.infer<
  typeof purchaseStatusResponseSchema
>;

export async function getSubscriptionStatus(token: string) {
  const response = await apiFetch("/purchases", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  return purchaseStatusResponseSchema.parse(await response.json());
}
