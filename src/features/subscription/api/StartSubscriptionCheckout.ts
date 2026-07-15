import { z } from "zod";
import { apiFetch } from "@/lib/apiFetch";

const startSubscriptionCheckoutResponseSchema = z.object({
  checkout_url: z.url(),
});

export async function startSubscriptionCheckout(token: string) {
  const response = await apiFetch("/subscriptions/checkout", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
  });

  const body = startSubscriptionCheckoutResponseSchema.parse(
    await response.json(),
  );

  return body.checkout_url;
}
