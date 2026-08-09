"use server";

import { refreshAuthToken } from "@/features/auth/api/RefreshAuthToken";
import { departPet } from "@/features/depart/api/DepartPet";
import {
  deleteAuthCookies,
  grantSetupAccessCookie,
  getAuthTokenCookie,
  setAuthTokenCookie,
} from "@/lib/authCookie";
import { ApiError } from "@/lib/apiFetch";
import { logServerError } from "@/lib/serverLogger";

const departFailedMessage =
  "旅立ちの準備を完了できませんでした。少し待ってからもう一度お試しください";
const unauthorizedMessage = "ログインし直してください";

export type DepartPetActionResult =
  | { destination: "/Login" | "/Setup"; success: true }
  | { error: string; success: false };

export async function departPetAction(): Promise<DepartPetActionResult> {
  const token = await getAuthTokenCookie();

  if (!token) {
    return { error: unauthorizedMessage, success: false };
  }

  let departureCompleted = false;

  try {
    await departPet(token);
    departureCompleted = true;

    // 旅立ったペットのIDがJWTに残らないよう、DBの最新状態で更新
    const refreshedToken = await refreshAuthToken(token);
    await setAuthTokenCookie(refreshedToken);
    await grantSetupAccessCookie();

    return { destination: "/Setup", success: true };
  } catch (error) {
    logServerError("Depart pet action failed", error);

    if (departureCompleted) {
      // DB上の旅立ちは完了済みなので、古いJWTを残さない
      await deleteAuthCookies();
      return { destination: "/Login", success: true };
    }

    if (error instanceof ApiError && error.status === 401) {
      return { error: unauthorizedMessage, success: false };
    }

    return { error: departFailedMessage, success: false };
  }
}
