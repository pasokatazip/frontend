"use server";

import { createUser } from "@/features/auth/api/CreateUser";
import { setAuthTokenCookie } from "@/features/auth/lib/authCookie";
import { signupSchema } from "@/features/auth/schemas/signupSchema";
import { logServerError } from "@/lib/serverLogger";

const signupFailedMessage = "アカウントを作成できませんでした";

export type SignupActionResult =
  | { success: true }
  | { error: string; success: false };

export async function signupAction(
  values: unknown,
): Promise<SignupActionResult> {
  const parsedValues = signupSchema.safeParse(values);

  if (!parsedValues.success) {
    return { error: signupFailedMessage, success: false };
  }

  try {
    const token = await createUser(parsedValues.data);
    await setAuthTokenCookie(token);

    return { success: true };
  } catch (error) {
    logServerError("Signup action failed", error);

    return { error: signupFailedMessage, success: false };
  }
}
