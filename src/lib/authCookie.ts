import { cookies } from "next/headers";
import { getServerEnv } from "@/config/serverEnv";
import { getAuthTokenExpiresAt } from "@/lib/authToken";

const authCookieName = "auth_token";
const purchaseActiveCookieName = "purchase_active";

export async function getAuthTokenCookie() {
  const cookieStore = await cookies();

  return cookieStore.get(authCookieName)?.value;
}

export async function deleteAuthCookies() {
  const cookieStore = await cookies();

  cookieStore.delete(authCookieName);
  cookieStore.delete(purchaseActiveCookieName);
}

export async function setAuthTokenCookie(token: string) {
  const cookieStore = await cookies();
  const { NODE_ENV } = getServerEnv();
  const expires = getAuthTokenExpiresAt(token);

  const options = {
    expires,
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: NODE_ENV === "production",
  } as const;

  cookieStore.set(authCookieName, token, options);
  cookieStore.delete(purchaseActiveCookieName);
}
