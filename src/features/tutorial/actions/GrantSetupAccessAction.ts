"use server";

import { redirect } from "next/navigation";
import {
  getAuthTokenCookie,
  grantSetupAccessCookie,
} from "@/lib/authCookie";
import { getPetIdFromToken } from "@/lib/authToken";

export async function grantSetupAccessAction() {
  const token = await getAuthTokenCookie();

  if (!token) {
    redirect("/Login");
  }

  if (getPetIdFromToken(token)) {
    redirect("/Home");
  }

  await grantSetupAccessCookie();
  redirect("/Setup");
}
