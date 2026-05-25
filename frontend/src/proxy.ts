import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken");

  // Protect dashboard routes: redirect to login if no access token
  if (request.nextUrl.pathname.startsWith("/admin/dashboard")) {
    if (!accessToken) {
      const loginUrl = new URL("/admin", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Prevent logged-in admins from accessing the login page (fixes browser back-button issue)
  if (request.nextUrl.pathname === "/admin" && accessToken) {
    const dashboardUrl = new URL("/admin/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
