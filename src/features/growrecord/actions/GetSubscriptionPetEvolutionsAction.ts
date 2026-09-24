"use server";

import { getAuthTokenCookie } from "@/lib/authCookie";
import { getSubscriptionPetEvolutionsApi } from "../api/GetSubscriptionPetEvolutionsApi";
import { logServerError } from "@/lib/serverLogger";

export async function getSubscriptionPetEvolutionsAction(petId: string) {
  try {
    const token = await getAuthTokenCookie();

    if (!token) {
      throw new Error("認証トークンがありません");
    }

    return await getSubscriptionPetEvolutionsApi(petId, token);
  } catch (error) {
    logServerError("Get subscription pet evolutions action failed", error);
    throw error;
  }
}
