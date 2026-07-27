"use server";

import { deleteAuthCookies } from "@/lib/authCookie";

export async function logoutAction() {
  await deleteAuthCookies();
}
