import React from "react";
import MainCard from "./EventCard";

interface EventRowProps {
  title: string;
}

export default function EventRow({ title }: EventRowProps) {
  return (
    <>
      <div className="flex items-center justify-between w-full mt-10">
        <span className="text-textPrimary text-l font-bold">{title}</span>
        <span className="text-primary text-l font-bold">See more</span>
      </div>
      <div className="flex items-center justify-between w-full h-72 px-4">
        <MainCard
          title="The Rockwell Rumble"
          dateRange="Jan/1/24 - Jan/4/24"
          attendees={64}
          style="Folkstyle"
          location="Herriman, UT"
          price="$60/team"
          status="In Progress"
        />
        <MainCard
          title="The Rockwell Rumble"
          dateRange="Jan/1/24 - Jan/4/24"
          attendees={64}
          style="Folkstyle"
          location="Herriman, UT"
          price="$60/team"
          status="Early Bird"
        />
        <MainCard
          title="The Rockwell Rumble"
          dateRange="Jan/1/24 - Jan/4/24"
          attendees={64}
          style="Folkstyle"
          location="Herriman, UT"
          price="$60/team"
          status="Registration Closing"
        />
        <MainCard
          title="The Rockwell Rumble"
          dateRange="Jan/1/24 - Jan/4/24"
          attendees={64}
          style="Folkstyle"
          location="Herriman, UT"
          price="$60/team"
          status="Registration Open"
        />
        <MainCard
          title="The Rockwell Rumble"
          dateRange="Jan/1/24 - Jan/4/24"
          attendees={64}
          style="Folkstyle"
          location="Herriman, UT"
          price="$60/team"
          status="In Progress"
        />
      </div>
    </>
  );
}
