import React from "react";
import CreateEventButton from "./CreateEventButton";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import EventPage from "./EventPage";

const Page = () => {
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

export default withPageAuthRequired(async () => <Page />);
