import { NextResponse } from "next/server";

export async function middleware(request) {
  const isAuthenticate = request.cookies.get("login")?.value === "true";
  const { pathname } = request.nextUrl;
  const url = "http://localhost:3000";
  // if user is unauthenticated and try to access profile page
  if (!isAuthenticate && pathname.startsWith("/pages/profile")) {
    return NextResponse.redirect(new URL(`${url}`, request.url));
  }
  if (isAuthenticate && pathname.startsWith("/pages/signup")) {
    return NextResponse.redirect(new URL(`${url}`, request.url));
  }
}
