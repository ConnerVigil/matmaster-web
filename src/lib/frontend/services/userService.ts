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

  async sendVerificationCode(phoneNumber: string): Promise<boolean> {
    const response = await fetch("/api/phone/sendcode", {
      method: "POST",
      body: JSON.stringify({ phoneNumber }),
    });

    if (!response.ok) {
      throw new Error("Failed to send verification code");
    }

    return true;
  },

  async verifyCode(phoneNumber: string, code: string): Promise<boolean> {
    const response = await fetch("/api/phone/verifycode", {
      method: "POST",
      body: JSON.stringify({ phoneNumber, code }),
    });

    if (!response.ok) {
      throw new Error("Failed to verify code");
    }

    return true;
  },
};
