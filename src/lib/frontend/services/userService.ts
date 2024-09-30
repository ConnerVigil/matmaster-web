import { User } from "@prisma/client";

interface CreateUserData {
  Username: string;
  Email: string;
  DOB: Date;
  Parental_Consent?: boolean;
  Worker_ID?: number;
  Participant_ID?: number;
  Coach_ID?: number;
  Coordinator_ID?: number;
  Is_Viewer: boolean;
  Is_Active: boolean;
}

export const userService = {
  async getAllUsers(): Promise<User[]> {
    const response = await fetch("/api/user");
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const data = await response.json();
    return data.users;
  },

  async getUserById(id: number): Promise<User> {
    const response = await fetch(`/api/user/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }
    return await response.json();
  },

  async createUser(userData: CreateUserData): Promise<User> {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error("Failed to create user");
    }
    return await response.json();
  },

  async updateUser(
    id: number,
    userData: Partial<CreateUserData>
  ): Promise<User> {
    const response = await fetch(`/api/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error("Failed to update user");
    }
    return await response.json();
  },

  async deleteUser(id: number): Promise<void> {
    const response = await fetch(`/api/user/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete user");
    }
  },
};
