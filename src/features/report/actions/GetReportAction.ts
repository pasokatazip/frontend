"use server";

import { cookies } from "next/headers";
import { getReportApi } from "../api/getReportApi";
import { getPetIdFromToken } from "@/lib/authToken";
import { logServerError } from "@/lib/serverLogger";

export async function getReportAction(date?: string) {
  try {
    const token = (await cookies()).get("auth_token")?.value;

    if (!token) throw new Error("認証トークンがありません");

    const petId = getPetIdFromToken(token);

    if (!petId) throw new Error("pet_idが取得できません");

    return await getReportApi(petId, date);
  } catch (error) {
    logServerError("Get report action failed", error);
    throw error;
  }
}
