"use client";

import React from "react";
import CreateEvent from "./CreateEvent";
import { redirect } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";

const CreateEventPage = () => {
  const { user } = useUser();

  if (!user) {
    redirect("/api/auth/login");
  }

  return (
    <div className="bg-white ">
      <div className="shadow-2xl container mx-auto max-w-3xl pb-4">
        <CreateEvent />
      </div>
    </div>
  );
};

export default CreateEventPage;
