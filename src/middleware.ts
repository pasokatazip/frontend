import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getPetIdFromToken, isAuthTokenCurrent } from "@/lib/authToken";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPurchaseCallback =
    pathname === "/Subscription" &&
    request.method === "POST" &&
    !request.headers.has("Next-Action");

  if (isPurchaseCallback) {
    return NextResponse.redirect(
      new URL("/Subscription?purchase=confirm", request.url),
      303,
    );
  }

  const isPublicPath =
    pathname === "/Login" ||
    pathname === "/Signup";

  const token = request.cookies.get("auth_token")?.value;
  const tokenIsCurrent = token ? isAuthTokenCurrent(token) : false;
  const isLoggedIn = Boolean(token) && tokenIsCurrent;

  if (!isLoggedIn && !isPublicPath) {
    const response = NextResponse.redirect(new URL("/Login", request.url));

    if (token && !tokenIsCurrent) {
      response.cookies.delete("auth_token");
    }

    return response;
  }

  if (
    isLoggedIn &&
    token &&
    pathname === "/Home" &&
    !getPetIdFromToken(token)
  ) {
    return NextResponse.redirect(new URL("/Setup", request.url));
  }

  if (
    isLoggedIn &&
    (pathname === "/" || pathname === "/Login" || pathname === "/Signup")
  ) {
    return NextResponse.redirect(new URL("/Home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * 以下のパスを除くすべてのリクエストにマッチさせる
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - 画像ファイルやCSSなどの拡張子を持つ静的ファイル
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js|webmanifest)).*)",
  ],
};
