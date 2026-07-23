import { apiFetch } from "@/lib/apiFetch";
import { ReportsResponseSchema } from "../schemas/ReportSchema";

export async function getReportApi(petId: string, date?: string) {
  const query = date ? `?date=${date}` : "";

  const res = await apiFetch(`/reports/${petId}${query}`);

  return ReportsResponseSchema.parse(await res.json());
}
