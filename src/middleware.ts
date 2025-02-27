import { getSession } from "@auth0/nextjs-auth0/edge";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "./lib/prisma";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Allow static assets to pass through without authentication checks
  if (path.startsWith("/images/")) {
    return NextResponse.next();
  }

  const session = await getSession(req, new NextResponse());
  const publicPaths = ["/", "/api", "/login"];

  console.log("path", path);

  // Get user from your database to check onboarding status
  let hasCompletedOnboarding = false;

  if (session?.sub) {
    // Fetch user data from your database
    const user = await prisma.user.findUnique({
      where: { Auth0_ID: session.sub },
    });

    hasCompletedOnboarding = user?.Onboarding_Complete ?? false;
  }

  // Check if the user is on a public route
  const isPublicRoute = publicPaths.includes(path);

  // Redirect logic
  if (!session && !isPublicRoute) {
    // Not logged in and trying to access protected route - redirect to home
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (session && path !== "/onboarding" && !hasCompletedOnboarding) {
    // Logged in but hasn't completed onboarding - redirect to onboarding
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  if (session && path === "/onboarding" && hasCompletedOnboarding) {
    // Completed onboarding but trying to access onboarding page - redirect to dashboard
    return NextResponse.redirect(new URL("/dashboard", req.url));
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
