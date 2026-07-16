import { cookies } from "next/headers";
import { getServerEnv } from "@/config/serverEnv";

const authCookieName = "auth_token";

export async function getAuthTokenCookie() {
  const cookieStore = await cookies();

  return cookieStore.get(authCookieName)?.value;
}

export async function setAuthTokenCookie(token: string) {
  const cookieStore = await cookies();
  const { NODE_ENV } = getServerEnv();

  cookieStore.set(authCookieName, token, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: NODE_ENV === "production",
  });
}
