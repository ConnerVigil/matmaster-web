"use client";

import React from "react";
import { redirect } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import CreateDualMeet from "./CreateDualMeet";

const CreateEventPage = () => {
  const { user } = useUser();

  if (!user) {
    redirect("/api/auth/login");
  }

  return (
    <div className="bg-white ">
      <div className="shadow-2xl container mx-auto max-w-3xl pb-4">
        <CreateDualMeet />
      </div>
    </div>
  );
};

export default CreateEventPage;
