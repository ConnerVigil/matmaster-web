import { getSession } from "@auth0/nextjs-auth0/edge";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "./lib/prisma";

export default async function middleware(req: NextRequest) {
  const session = await getSession(req, new NextResponse());

  console.log("middleware");
  if (session) {
    console.log("session");
  }

  if (!session?.user) {
    return NextResponse.redirect(new URL("/api/auth/login", req.url));
  }

  const path = req.nextUrl.pathname;
  const publicPaths = ["/api", "/login", "/onboarding"];
  const isPublicPath = publicPaths.some((p) => path.startsWith(p));

  if (!isPublicPath) {
    const user = await prisma.user.findUnique({
      where: { Auth0_ID: session.user.sub },
    });

    if (!user?.Onboarding_Complete && path !== "/onboarding") {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }
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
