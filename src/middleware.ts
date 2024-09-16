import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const cookieValue = request.cookies.get("toandeptrai")?.value;
  if (!cookieValue) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

// Áp dụng middleware cho tất cả các routes
export const config = {
  matcher: ["/a/:path*"],
};
