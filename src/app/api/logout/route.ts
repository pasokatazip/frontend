import { deleteAuthCookies } from "@/lib/authCookie";

export async function POST() {
  await deleteAuthCookies();

  return new Response(null, { status: 204 });
}
