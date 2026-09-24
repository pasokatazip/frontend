import { apiFetch } from "@/lib/apiFetch";
import { ReportsResponseSchema } from "../schemas/ReportSchema";

export async function getReportApi(petId: string, date?: string) {
  const query = date ? `?date=${encodeURIComponent(date)}` : "";

  const res = await apiFetch(`/reports/${encodeURIComponent(petId)}${query}`);

  return ReportsResponseSchema.parse(await res.json());
}
