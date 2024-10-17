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

  // async getSignedUrl(file: File, userId: number): Promise<boolean> {
  //   const response = await fetch("/api/user/uploadProfileImage", {
  //     method: "POST",
  //     body: JSON.stringify({ userId: userId, image: file }),
  //   });

  //   console.log(response);

  //   if (!response.ok) {
  //     throw new Error("Failed to upload profile image");
  //   }

  //   return (await response.json()).signedUrl;
  // },

  // async uploadProfileImageToS3(
  //   signedUrl: string,
  //   file: File
  // ): Promise<boolean> {
  //   const response = await fetch(signedUrl, {
  //     method: "PUT",
  //     body: file,
  //   });

  //   console.log("uploadProfileImageToS3 response: ", response);

  //   if (!response.ok) {
  //     throw new Error("Failed to upload profile image");
  //   }

  //   return true;
  // },

  async uploadProfileImage(file: File) {
    try {
      // Step 1: Get the signed URL from your backend
      const response = await fetch("/api/user/uploadProfileImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileName: file.name, fileType: file.type }),
      });

      if (!response.ok) {
        throw new Error("Failed to get signed URL");
      }

      const { url: signedUrl, fields } = await response.json();

      // Step 2: Prepare the form data for the S3 upload
      const formData = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      formData.append("file", file);

      // Step 3: Upload the file directly to S3 using the signed URL
      const uploadResponse = await fetch(signedUrl, {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload file to S3");
      }

      // Step 4: Notify your backend that the upload was successful
      const finalizeResponse = await fetch("/api/user/finalizeProfileImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileName: file.name }),
      });

      if (!finalizeResponse.ok) {
        throw new Error("Failed to finalize profile image update");
      }

      console.log("Profile image uploaded successfully");
    } catch (error) {
      console.error("Error uploading profile image:", error);
    }
  },
};
