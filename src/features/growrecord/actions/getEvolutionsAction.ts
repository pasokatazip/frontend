"use server";

import { cookies } from "next/headers";
import { getEvolutionsApi } from "../api/getEvolutionsApi";

export async function getEvolutionsAction() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      throw new Error("認証トークンがありません");
    }

    return await getEvolutionsApi(token);
  } catch (error) {
    console.error("進化履歴の取得に失敗しました", error);
    throw error;
  }
}
