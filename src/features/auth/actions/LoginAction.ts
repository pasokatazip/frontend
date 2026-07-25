"use server";

import { loginUser } from "@/features/auth/api/LoginUser";
import { setAuthTokenCookie } from "@/lib/authCookie";
import { loginSchema } from "@/features/auth/schemas/loginSchema";
import { logServerError } from "@/lib/serverLogger";
import { getPetIdFromToken } from "@/lib/authToken";

const loginFailedMessage = "メールアドレスまたはパスワードが違います";

export type LoginActionResult =
  | { destination: "/Home" | "/Tutorial"; success: true }
  | { error: string; success: false };

export async function loginAction(
  values: unknown,
): Promise<LoginActionResult> {
  const parsedValues = loginSchema.safeParse(values);

  if (!parsedValues.success) {
    return { error: loginFailedMessage, success: false };
  }

  try {
    const token = await loginUser(parsedValues.data);
    await setAuthTokenCookie(token);

    return {
      destination: getPetIdFromToken(token) ? "/Home" : "/Tutorial",
      success: true,
    };
  } catch (error) {
    logServerError("Login action failed", error);

    return { error: loginFailedMessage, success: false };
  }
}
