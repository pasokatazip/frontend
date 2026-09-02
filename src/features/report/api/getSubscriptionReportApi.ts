import { apiFetch } from "@/lib/apiFetch";
import { SubscriptionReportsResponseSchema } from "../schemas/ReportSchema";

export async function getSubscriptionReportApi(token: string, date: string) {
  const res = await apiFetch(`/subsc/report/${date}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return SubscriptionReportsResponseSchema.parse(await res.json());
}
