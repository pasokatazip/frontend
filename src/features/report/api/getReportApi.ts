import { apiFetch } from "@/lib/apiFetch";
import { ReportsResponseSchema } from "../schemas/ReportSchema";

export async function getReportApi(
  token: string,
  petId: string,
  date?: string,
) {
  const query = date ? `?date=${encodeURIComponent(date)}` : "";

  const res = await apiFetch(`/reports/${encodeURIComponent(petId)}${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return ReportsResponseSchema.parse(await res.json());
}
