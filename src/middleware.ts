import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicPath = pathname === "/Login" || pathname === "/Signup";

  const token = request.cookies.get("auth_token");
  const isLoggedIn = Boolean(token);

  if (!isLoggedIn && !isPublicPath) {
    return NextResponse.redirect(new URL("/Login", request.url));
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
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js)).*)",
  ],
};
