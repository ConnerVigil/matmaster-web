import { prisma } from "@/lib/prisma";
import { getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(
  request: NextApiRequest,
  response: NextApiResponse
): Promise<NextResponse> {
  try {
    const session = await getSession(request, response);

    if (!session || !session.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    try {
      prisma.user.findUnique;
    } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).json({ error: "Internal server error" });
    }

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
