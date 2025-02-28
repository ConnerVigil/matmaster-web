import { getSession } from "@auth0/nextjs-auth0/edge";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserMetadata } from "./lib/auth0";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const publicPaths = ["/", "/api", "/login"];

  console.log("path", path);

  if (path.startsWith("/images/")) {
    return NextResponse.next();
  }

  // Skip middleware for Auth0 routes
  if (path.startsWith("/api/auth/")) {
    return NextResponse.next();
  }

  const session = await getSession(req, new NextResponse());
  console.log("session", session);
  let hasCompletedOnboarding = false;

  if (session?.sub) {
    const user = await getUserMetadata(session.sub);
    hasCompletedOnboarding = user.user_metadata.Has_Completed_Onboarding;
  }

  // if (session?.sub) {
  //   hasCompletedOnboarding =
  //     session.user?.user_metadata?.Has_Completed_Onboarding ?? false;
  // }

  console.log("hasCompletedOnboarding", hasCompletedOnboarding);

  const isPublicRoute = publicPaths.includes(path);

  if (!session && !isPublicRoute) {
    console.log("redirecting to /");
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (session && path !== "/onboarding" && !hasCompletedOnboarding) {
    console.log("redirecting to /onboarding");
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  if (session && path === "/onboarding" && hasCompletedOnboarding) {
    console.log("redirecting to /");
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
