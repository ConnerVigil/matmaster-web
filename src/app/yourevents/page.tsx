import EventTable from "@/components/EventTable";
import React from "react";
import CreateEventButton from "./CreateEventButton";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

const events = [
  {
    id: 1,
    name: "The Rockwell Rumble",
    status: "Early Bird",
    date: "Jan/1/24 - Jan/4/24",
    style: "Folkstyle",
    location: "Regional Sport Complex",
    attendees: 121,
    price: 60,
  },
  {
    id: 2,
    name: "The Rockwell Rumble",
    status: "Early Bird",
    date: "Jan/1/24 - Jan/4/24",
    style: "Folkstyle",
    location: "Regional Sport Complex",
    attendees: 121,
    price: 60,
  },
  {
    id: 3,
    name: "The Rockwell Rumble",
    status: "Early Bird",
    date: "Jan/1/24 - Jan/4/24",
    style: "Folkstyle",
    location: "Regional Sport Complex",
    attendees: 121,
    price: 60,
  },
  {
    id: 4,
    name: "The Rockwell Rumble",
    status: "Early Bird",
    date: "Jan/1/24 - Jan/4/24",
    style: "Folkstyle",
    location: "Regional Sport Complex",
    attendees: 121,
    price: 60,
  },
];

const Page = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center">
      <div className="w-full px-12 mt-6">
        <div className="flex justify-between w-full items-center mb-6">
          <h1 className="text-textPrimary text-2xl font-bold">Your Events</h1>
          <CreateEventButton />
        </div>
        <EventTable events={events} />
      </div>
    </div>
  );
};

export default withPageAuthRequired(async () => <Page />);
