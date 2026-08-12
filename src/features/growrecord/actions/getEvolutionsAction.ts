"use server";

import { cookies } from "next/headers";
import { getEvolutionsApi } from "../api/getEvolutionsApi";
import { logServerError } from "@/lib/serverLogger";

export async function getEvolutionsAction() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      throw new Error("認証トークンがありません");
    }

    return await getEvolutionsApi(token);
  } catch (error) {
    logServerError("Get evolutions action failed", error);
    throw error;
  }
}
