"use server";

import { redirect } from "next/navigation";
import { deleteAuthCookies } from "@/lib/authCookie";

export async function logoutAction() {
  await deleteAuthCookies();
  redirect("/Login");
}
