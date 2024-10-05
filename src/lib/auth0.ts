import { Session } from "@auth0/nextjs-auth0";
import { prisma } from "./prisma";

export async function syncUser(session: Session | null | undefined) {
  if (!session || !session.user) return null;
  const { user } = session;

  const dbUser = await prisma.user.upsert({
    where: { Auth0_ID: user.sub },
    update: {
      Email: user.email,
      Username: user.name,
    },
    create: {
      Auth0_ID: user.sub,
      Username: user.name,
      Email: user.email,
      Is_Viewer: false,
      Is_Active: false,
      Onboarding_Complete: false,
    },
  });

  return dbUser;
}
