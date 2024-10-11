import { prisma } from "@/lib/prisma";
import { getSession } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  response: NextResponse
): Promise<NextResponse> {
  try {
    const session = await getSession(request, response);
    console.log("session:", session);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { Auth0_ID: session.user.sub },
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
