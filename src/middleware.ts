import { getSession } from "@auth0/nextjs-auth0/edge";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const publicPaths = ["/", "/api", "/login"];

  if (path.startsWith("/images/") || path.startsWith("/api/auth/")) {
    return NextResponse.next();
  }

  const session = await getSession(req, new NextResponse());
  const isPublicRoute = publicPaths.includes(path);

  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
