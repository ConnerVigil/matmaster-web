import { syncUser } from "@/lib/auth0";
import { handleAuth, handleCallback, getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export const GET = handleAuth({
  callback: async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const response = await handleCallback(req, res);
      const session = await getSession(req, res);
      const user = await syncUser(session);

      if (user && !user.Onboarding_Complete) {
        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_URL}/onboarding`
        );
      }

      return response;
    } catch (error) {
      console.error(error);
      return res.status(500).end("Internal Server Error");
    }
  },
});
