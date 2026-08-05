"use server";

import { loginUser } from "@/features/auth/api/LoginUser";
import { setAuthTokenCookie } from "@/lib/authCookie";
import { loginSchema } from "@/features/auth/schemas/loginSchema";
import { logServerError } from "@/lib/serverLogger";
import { getPetIdFromToken } from "@/lib/authToken";
import { getCurrentPet } from "@/features/home/api/GetCurrentPet";

const loginFailedMessage = "メールアドレスまたはパスワードが違います";

export type LoginActionResult =
  | { destination: "/Depart" | "/Home" | "/Tutorial"; success: true }
  | { error: string; success: false };

export async function loginAction(values: unknown): Promise<LoginActionResult> {
  const parsedValues = loginSchema.safeParse(values);

  if (!parsedValues.success) {
    return { error: loginFailedMessage, success: false };
  }

  try {
    const token = await loginUser(parsedValues.data);
    const petId = getPetIdFromToken(token);
    let destination: "/Depart" | "/Home" | "/Tutorial" = petId
      ? "/Home"
      : "/Tutorial";

    if (petId) {
      try {
        const pet = await getCurrentPet(token);
        if (pet.departure?.canDepart) {
          destination = "/Depart";
        }
      } catch (error) {
        logServerError("Login departure lookup failed", error);
      }
    }

    await setAuthTokenCookie(token);

    return {
      destination,
      success: true,
    };
  } catch (error) {
    logServerError("Login action failed", error);

    return { error: loginFailedMessage, success: false };
  }
}
