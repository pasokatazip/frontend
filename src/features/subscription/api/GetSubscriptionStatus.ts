import { z } from "zod";
import { apiFetch } from "@/lib/apiFetch";

const subscriptionStatusSchema = z.object({
  active: z.boolean(),
  fincode_customer_id: z.string().optional(),
  fincode_subscription_id: z.string().optional(),
});

export type SubscriptionStatus = z.infer<typeof subscriptionStatusSchema>;

export async function getSubscriptionStatus(token: string) {
  const response = await apiFetch("/subscriptions", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  return subscriptionStatusSchema.parse(await response.json());
}
