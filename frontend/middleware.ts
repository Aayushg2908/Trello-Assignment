import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { authRoutes, DEFAULT_REDIRECT } from "./lib/constants";

export async function middleware(req: NextRequest) {
  const token = cookies().get("token");
  const path = req.nextUrl.pathname;

  const isAuthRoute = authRoutes.includes(path);

  if (isAuthRoute) {
    if (token) {
      return NextResponse.redirect(new URL(DEFAULT_REDIRECT, req.nextUrl));
    }
    return null;
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return null;
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
