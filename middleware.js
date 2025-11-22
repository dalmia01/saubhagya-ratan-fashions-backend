import { NextResponse } from "next/server";

export function middleware(req) {
  console.log("hheheh")
  const token = req.cookies.get("token");
  const url = req.nextUrl.clone();

  if (url.pathname === "/") {
    url.pathname = token ? "/dashboard" : "/login";
    return NextResponse.redirect(url);
  }

  if (url.pathname === "/login" && token) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  if (url.pathname.startsWith("/dashboard") && !token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/dashboard/:path*"],
};
