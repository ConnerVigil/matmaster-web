"use client";

import React from "react";
import CreateEventButton from "./CreateEventButton";
import EventPage from "./EventPage";
import { redirect } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";

const Page = () => {
  const { user } = useUser();

  if (!user) {
    redirect("/api/auth/login");
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
