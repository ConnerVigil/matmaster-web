import { User } from "@prisma/client";

export const userService = {
  async getUserFromDB(): Promise<User> {
    try {
      const response = await fetch("/api/user");

      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }

      return (await response.json()).user;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  },

  async sendVerificationCode(
    phoneNumber: string,
    userId: number
  ): Promise<boolean> {
    try {
      const response = await fetch("/api/phone/sendcode", {
        method: "POST",
        body: JSON.stringify({ phoneNumber, userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to send verification code");
      }

      return true;
    } catch (error) {
      console.error("Error sending verification code:", error);
      throw error;
    }
  },

  async verifyCode(phoneNumber: string, code: string): Promise<boolean> {
    try {
      const response = await fetch("/api/phone/verifycode", {
        method: "POST",
        body: JSON.stringify({ phoneNumber, code }),
      });

      if (!response.ok) {
        throw new Error("Failed to verify code");
      }

      return true;
    } catch (error) {
      console.error("Error verifying code:", error);
      throw error;
    }
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
    try {
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
    } catch (error) {
      console.error("Error onboarding user:", error);
      throw error;
    }
  },

  async uploadImageToS3(file: File, userId: number) {
    try {
      const s3Response = await fetch("/api/user/s3Url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId }),
      });

      if (!s3Response.ok) {
        throw new Error("Failed to get presigned URL");
      }

      const { signedUrl } = await s3Response.json();

      const formData = new FormData();
      Object.entries(signedUrl.fields).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      formData.append("file", file);

      const uploadResponse = await fetch(signedUrl.url, {
        method: "PUT",
        body: formData,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload file to S3");
      }

      return signedUrl.split("?")[0];
    } catch (error) {
      console.error("Error uploading image to S3:", error);
      throw error;
    }
  },
};
