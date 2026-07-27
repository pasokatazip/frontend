"use server";

import { createPet } from "@/features/setup/api/CreatePet";
import { refreshAuthToken } from "@/features/auth/api/RefreshAuthToken";
import { petSetupSchema } from "@/features/setup/schemas/petSetupSchema";
import { getAuthTokenCookie, setAuthTokenCookie } from "@/lib/authCookie";
import { ApiError } from "@/lib/apiFetch";
import { logServerError } from "@/lib/serverLogger";
import { hueRotateToColorCode } from "@/utils/hueRotateToColorCode";

const createPetFailedMessage = "ペットを作成できませんでした";
const unauthorizedMessage = "ログインし直してください";

export type CreatePetActionResult =
  | { success: true }
  | { error: string; success: false };

export async function createPetAction(
  values: unknown,
): Promise<CreatePetActionResult> {
  const parsedValues = petSetupSchema.safeParse(values);

  if (!parsedValues.success) {
    return { error: createPetFailedMessage, success: false };
  }

  const token = await getAuthTokenCookie();

  if (!token) {
    return { error: unauthorizedMessage, success: false };
  }

  try {
    await createPet(token, {
      color: hueRotateToColorCode(parsedValues.data.hueRotate),
      name: parsedValues.data.name,
    });
    const refreshedToken = await refreshAuthToken(token);
    await setAuthTokenCookie(refreshedToken);

    return { success: true };
  } catch (error) {
    logServerError("Create pet action failed", error);

    if (error instanceof ApiError && error.status === 401) {
      return { error: unauthorizedMessage, success: false };
    }

    return { error: createPetFailedMessage, success: false };
  }
}
