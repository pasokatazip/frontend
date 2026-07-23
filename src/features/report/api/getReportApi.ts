import { apiFetch } from "@/lib/apiFetch";
import { ReportsResponseSchema } from "../schemas/ReportSchema";

export async function getReportApi(petId: string) {
  const res = await apiFetch(`/reports/${petId}`);
  return ReportsResponseSchema.parse(await res.json());
}
