"use client";

import React, { useEffect } from "react";
import CreateEventButton from "./CreateEventButton";
import EventPage from "./EventPage";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import LoadingSpinner from "@/lib/frontend/LoadingSpinner";

const Page = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/api/auth/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="bg-white min-h-screen flex flex-col items-center">
      <div className="w-full px-6 mt-6">
        <div className="flex justify-between w-full items-center mb-6">
          <h1 className="text-gray1 text-2xl font-bold">Your Events</h1>
          <CreateEventButton />
        </div>
        <EventPage />
      </div>
    </div>
  );
};

export default Page;
