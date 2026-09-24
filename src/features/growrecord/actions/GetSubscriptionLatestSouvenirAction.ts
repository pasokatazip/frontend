"use server";

import { getAuthTokenCookie } from "@/lib/authCookie";
import { getSubscriptionLatestSouvenirApi } from "../api/GetSubscriptionLatestSouvenirApi";
import { logServerError } from "@/lib/serverLogger";

export async function getSubscriptionLatestSouvenirAction(petId: string) {
  try {
    const token = await getAuthTokenCookie();

    if (!token) {
      throw new Error("認証トークンがありません");
    }

    return await getSubscriptionLatestSouvenirApi(petId, token);
  } catch (error) {
    logServerError("Get subscription latest souvenir action failed", error);
    throw error;
  }
}
