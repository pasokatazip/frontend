import { z } from "zod";
import { apiFetch } from "@/lib/apiFetch";

const startPurchaseCheckoutResponseSchema = z.object({
  checkout_url: z.url(),
});

export async function startPurchaseCheckout(token: string) {
  const response = await apiFetch("/purchases/checkout", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
  });

  const body = startPurchaseCheckoutResponseSchema.parse(
    await response.json(),
  );

  return body.checkout_url;
}
