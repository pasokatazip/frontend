"use server";

import { getAuthTokenCookie } from "@/lib/authCookie";
import { getLatestSouvenirApi } from "../api/GetLatestSouvenirApi";
import { logServerError } from "@/lib/serverLogger";

export async function getLatestSouvenirAction() {
  try {
    const token = await getAuthTokenCookie();

    if (!token) {
      throw new Error("認証トークンがありません");
    }

    return await getLatestSouvenirApi(token);
  } catch (error) {
    logServerError("Get latest souvenir action failed", error);
    throw error;
  }
}
