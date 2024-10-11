import { prisma } from "@/lib/prisma";
import { getSession } from "@auth0/nextjs-auth0";

export async function GET(
  request: Request,
  response: Response
): Promise<Response> {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      return Response.json({ error: "Not authenticated" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { Auth0_ID: session.user.sub },
    });

    return Response.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
