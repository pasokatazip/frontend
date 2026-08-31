import { apiFetch } from "@/lib/apiFetch";
import { ReportsResponseSchema } from "../schemas/ReportSchema";

export async function getSubscriptionReportApi(token: string, date: string) {
  const res = await apiFetch(`/subsc/report/${date}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return ReportsResponseSchema.parse(await res.json());
}
