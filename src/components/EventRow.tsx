import React from "react";
import EventCard from "./EventCard";

const events = Array(15).fill({
  title: "The Rockwell Rumble",
  dateRange: "Jan/1/24 - Jan/4/24",
  attendees: 64,
  style: "Folkstyle",
  location: "Herriman, UT",
  price: "60/team",
  status: "Registration Open",
  imageSource: "/images/rockwellRumble.webp",
});

interface EventRowProps {
  title: string;
}

export default function EventRow({ title }: EventRowProps) {
  return (
    <>
      <div className="flex items-center justify-between w-full mt-10">
        <span className="text-gray1 text-l font-bold">{title}</span>
        <span className="text-primary text-l font-bold">See more</span>
      </div>
      <div className="overflow-x-auto w-full h-72 px-4">
        {/* <div className="flex space-x-4 w-max">
          {events.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div> */}
      </div>
    </>
  );
}
