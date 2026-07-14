"use server";

import { loginUser } from "@/features/auth/api/LoginUser";
import { setAuthTokenCookie } from "@/features/auth/lib/authCookie";
import { loginSchema } from "@/features/auth/schemas/loginSchema";
import { logServerError } from "@/lib/serverLogger";

const loginFailedMessage = "メールアドレスまたはパスワードが違います";

export type LoginActionResult =
  | { success: true }
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

    return { success: true };
  } catch (error) {
    logServerError("Login action failed", error);

    return { error: loginFailedMessage, success: false };
  }
}
