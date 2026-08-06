"use server";

import { updatePetProfile } from "@/features/setting/api/UpdatePetProfile";
import { petProfileSchema } from "@/features/setting/schemas/petProfileSchema";
import { getAuthTokenCookie } from "@/lib/authCookie";
import { getPetIdFromToken } from "@/lib/authToken";
import { ApiError } from "@/lib/apiFetch";
import { logServerError } from "@/lib/serverLogger";

const updateFailedMessage = "ペットの設定を変更できませんでした";
const unauthorizedMessage = "ログインし直してください";

export type UpdatePetProfileActionResult =
  | { success: true }
  | { error: string; success: false };

export async function updatePetProfileAction(
  values: unknown,
): Promise<UpdatePetProfileActionResult> {
  const parsedValues = petProfileSchema.safeParse(values);

  if (!parsedValues.success) {
    return { error: updateFailedMessage, success: false };
  }

  const token = await getAuthTokenCookie();
  const petId = token ? getPetIdFromToken(token) : null;

  if (!token || !petId) {
    return { error: unauthorizedMessage, success: false };
  }

  try {
    await updatePetProfile(token, petId, parsedValues.data);

    return { success: true };
  } catch (error) {
    logServerError("Update pet profile action failed", error);

    if (error instanceof ApiError && error.status === 401) {
      return { error: unauthorizedMessage, success: false };
    }

    if (error instanceof ApiError && error.status === 403) {
      return { error: "超YO-YO！への加入が必要です", success: false };
    }

    return { error: updateFailedMessage, success: false };
  }
}
