import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { User } from "@prisma/client";

export function useUserData() {
  const { user, isLoading: isAuth0Loading } = useUser();
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user && !isAuth0Loading) {
      fetchUserData(user.sub as string);
    } else if (!isAuth0Loading) {
      setIsLoading(false);
    }
  }, [user, isAuth0Loading]);

  const fetchUserData = async (auth0Id: string) => {
    try {
      const response = await fetch(`/api/user?auth0Id=${auth0Id}`);
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { userData, isLoading };
}
