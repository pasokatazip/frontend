"use server";

import { cookies } from "next/headers";
import { getReportApi } from "../api/getReportApi";
import { getPetIdFromToken } from "@/lib/authToken";

export async function getReportAction(date?: string) {
  const token = (await cookies()).get("auth_token")?.value;

  if (!token) throw new Error("認証トークンがありません");

  const petId = getPetIdFromToken(token);

  if (!petId) throw new Error("pet_idが取得できません");

  return getReportApi(petId, date);
}
