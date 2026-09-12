import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

const ROLE_ROUTES: Record<string, string> = {
  "/student": "STUDENT",
  "/industry": "INDUSTRY",
  "/tpo": "TPO",
  "/government": "GOVERNMENT",
  "/faculty": "FACULTY",
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("auth-token")?.value;

  const matchedPrefix = Object.keys(ROLE_ROUTES).find((prefix) =>
    pathname.startsWith(prefix)
  );

  if (!matchedPrefix) {
    return NextResponse.next();
  }

  // If unauthenticated, redirect to login
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const payload = await verifyToken(token);

  if (!payload) {
    const loginUrl = new URL("/login", request.url);
    const res = NextResponse.redirect(loginUrl);
    res.cookies.delete("auth-token");
    return res;
  }

  // Allow government admin to view all aggregate pages
  if (payload.role === "GOVERNMENT") {
    return NextResponse.next();
  }

  // If user role doesn't match dashboard prefix, route to their own dashboard
  const requiredRole = ROLE_ROUTES[matchedPrefix];
  if (payload.role !== requiredRole) {
    const roleHomeMap: Record<string, string> = {
      STUDENT: "/student",
      INDUSTRY: "/industry",
      TPO: "/tpo",
      GOVERNMENT: "/government",
      FACULTY: "/faculty",
    };
    const target = roleHomeMap[payload.role] || "/login";
    return NextResponse.redirect(new URL(target, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/student/:path*",
    "/industry/:path*",
    "/tpo/:path*",
    "/government/:path*",
    "/faculty/:path*",
  ],
};
