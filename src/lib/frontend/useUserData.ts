import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { User } from "@prisma/client";

export function useUserData() {
  const { user, isLoading: isAuth0Loading } = useUser();
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user && !isAuth0Loading) {
      fetchUserData();
    } else if (!isAuth0Loading) {
      setIsLoading(false);
    }
  }, [user, isAuth0Loading]);

  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/user");
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
