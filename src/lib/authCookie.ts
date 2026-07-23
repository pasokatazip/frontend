import { cookies } from "next/headers";
import { getServerEnv } from "@/config/serverEnv";
import { getAuthTokenExpiresAt } from "@/lib/authToken";

const authCookieName = "auth_token";

export async function getAuthTokenCookie() {
  const cookieStore = await cookies();

  return cookieStore.get(authCookieName)?.value;
}

export async function setAuthTokenCookie(token: string) {
  const cookieStore = await cookies();
  const { NODE_ENV } = getServerEnv();
  const expires = getAuthTokenExpiresAt(token);

  cookieStore.set(authCookieName, token, {
    expires,
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: NODE_ENV === "production",
  });
}
