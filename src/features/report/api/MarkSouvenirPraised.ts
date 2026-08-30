import { z } from "zod";
import { apiFetch } from "@/lib/apiFetch";

const souvenirPraiseFlagResponseSchema = z.object({
  hasPraised: z.literal(true),
  praisedAt: z.string().nullable(),
  reportDate: z.string(),
});

export async function markSouvenirPraised(token: string, reportDate: string) {
  const response = await apiFetch(
    `/users/me/souvenir-praise/${encodeURIComponent(reportDate)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "PUT",
    },
  );

  return souvenirPraiseFlagResponseSchema.parse(await response.json());
}
