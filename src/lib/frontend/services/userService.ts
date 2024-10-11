import { User } from "@prisma/client";

// interface CreateUserData {
//   Username: string;
//   Email: string;
//   DOB: Date;
//   Parental_Consent?: boolean;
//   Worker_ID?: number;
//   Participant_ID?: number;
//   Coach_ID?: number;
//   Coordinator_ID?: number;
//   Is_Viewer: boolean;
//   Is_Active: boolean;
// }

export const userService = {
  async onboardUser(id: number): Promise<User> {
    const response = await fetch(`/api/user/onboard/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to mark onboarding complete");
    }

    return await response.json();
  },

  async getUserFromDB(): Promise<User> {
    const response = await fetch("/api/user");

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    return (await response.json()).user;
  },
};
