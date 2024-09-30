import { syncUser } from "@/lib/auth0";
import { handleAuth, handleCallback, getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

export const GET = handleAuth({
  callback: async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const response = await handleCallback(req, res);
      const session = await getSession(req, res);
      await syncUser(session);
      return response;
    } catch (error) {
      console.error(error);
    }
  },
});
