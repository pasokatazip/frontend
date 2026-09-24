"use server";

import { cookies } from "next/headers";
import { getSubscriptionReportApi } from "../api/getSubscriptionReportApi";
import { logServerError } from "@/lib/serverLogger";

export async function getSubscriptionReportAction(date: string) {
  try {
    const token = (await cookies()).get("auth_token")?.value;

    if (!token) {
      throw new Error("認証トークンがありません");
    }

    return await getSubscriptionReportApi(token, date);
  } catch (error) {
    logServerError("Get subscription report action failed", error);
    throw error;
  }
}
