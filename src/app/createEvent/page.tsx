import React from "react";
import CreateEvent from "./CreateEvent";
import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";

const CreateEventPage = async () => {
  const session = await getSession();

  if (!session) {
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
