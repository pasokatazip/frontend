"use server";

import { getAuthTokenCookie } from "@/lib/authCookie";
import { getEvolutionsApi } from "../api/getEvolutionsApi";
import { logServerError } from "@/lib/serverLogger";

export async function getEvolutionsAction() {
  try {
    const token = await getAuthTokenCookie();

    if (!token) {
      throw new Error("認証トークンがありません");
    }

    return await getEvolutionsApi(token);
  } catch (error) {
    logServerError("Get evolutions action failed", error);
    throw error;
  }
}
