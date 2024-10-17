import { User } from "@prisma/client";

export const userService = {
  async getUserFromDB(): Promise<User> {
    const response = await fetch("/api/user");

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    return (await response.json()).user;
  },

  async sendVerificationCode(
    phoneNumber: string,
    userId: number
  ): Promise<boolean> {
    const response = await fetch("/api/phone/sendcode", {
      method: "POST",
      body: JSON.stringify({ phoneNumber, userId }),
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

  async updateUserProfile(
    userId: string,
    profileData: {
      profileImage: string | null;
      gender: string;
      grade: string;
      dateOfBirth: string;
    }
  ): Promise<User> {
    try {
      const response = await fetch(`/api/users/${userId}/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user profile");
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  },

  async onboardUser(
    userId: number,
    onboardingData: {
      firstName: string;
      lastName: string;
      gender: string;
      grade: number;
      dateOfBirth: string;
    }
  ): Promise<User> {
    const response = await fetch(`/api/user/onboard/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(onboardingData),
    });

    if (!response.ok) {
      throw new Error("Failed to mark onboarding complete");
    }

    return await response.json();
  },
};
