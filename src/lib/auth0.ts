import { Session } from "@auth0/nextjs-auth0";
import { prisma } from "./prisma";
import { ManagementClient } from "auth0";

const management = new ManagementClient({
  domain: process.env.AUTH0_DOMAIN!,
  clientId: process.env.AUTH0_CLIENT_ID!,
  clientSecret: process.env.AUTH0_CLIENT_SECRET!,
});

interface UserMetadata {
  Has_Completed_Onboarding: boolean;
}

export async function updateUserMetadata(
  userId: string,
  metadata: UserMetadata
) {
  await management.users.update({ id: userId }, { user_metadata: metadata });
}

export async function getUserMetadata(userId: string) {
  const user = await management.users.get({ id: userId });
  console.log("user", user);
  return user.data;
}

export async function syncUser(session: Session | null | undefined) {
  if (!session || !session.user) return null;
  const { user } = session;

  const existingUser = await prisma.user.findUnique({
    where: { Auth0_ID: user.sub },
  });

  const isNewUser = !existingUser;

  const dbUser = await prisma.user.upsert({
    where: { Auth0_ID: user.sub },
    update: {
      Email: user.email,
    },
    create: {
      Auth0_ID: user.sub,
      Email: user.email,
      Is_Viewer: false,
      Is_Active: false,
    },
  });

  if (isNewUser) {
    await updateUserMetadata(user.sub, {
      Has_Completed_Onboarding: false,
    });
  }

  return dbUser;
}
