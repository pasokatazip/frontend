import { z } from "zod";
import { apiFetch } from "@/lib/apiFetch";

const confirmPurchaseResponseSchema = z.object({
  subsc: z.boolean(),
});

export async function confirmPurchase(token: string) {
  const response = await apiFetch("/purchases/confirm", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
  });

  return confirmPurchaseResponseSchema.parse(await response.json()).subsc;
}
