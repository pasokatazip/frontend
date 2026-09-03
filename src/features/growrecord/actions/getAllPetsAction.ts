"use server";

import { getAuthTokenCookie } from "@/lib/authCookie";
import { getAllPetsApi } from "../api/GetAllPetsApi";
import { logServerError } from "@/lib/serverLogger";

export async function getAllPetsAction() {
  try {
    const token = await getAuthTokenCookie();

    if (!token) {
      throw new Error("認証トークンがありません");
    }

    return await getAllPetsApi(token);
  } catch (error) {
    logServerError("Get all pets action failed", error);
    throw error;
  }
}
