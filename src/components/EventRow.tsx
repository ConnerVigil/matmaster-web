import React from "react";
import EventCard from "./EventCard";
import {
  EventStatusENUM,
  EventTypeENUM,
  StyleENUM,
  EntryTypeENUM,
  Prisma,
} from "@prisma/client";

const events = Array(5)
  .fill(null)
  .map((_, index) => ({
    ID: index + 1,
    Status: index % 3 === 0 ? EventStatusENUM.DRAFT : EventStatusENUM.PUBLISHED,
    Name: `Wrestling Event ${index + 1}`,
    Event_Type:
      index % 2 === 0 ? EventTypeENUM.Tournament : EventTypeENUM.Dualmeet,
    Start_Date: new Date(2024, 0, index + 1),
    End_Date: new Date(2024, 0, index + 3),
    Style:
      index % 3 === 0
        ? StyleENUM.Folkstyle
        : index % 3 === 1
        ? StyleENUM.Freestyle
        : StyleENUM.GrecoRoman,
    More_Info: "Join us for an exciting wrestling event!",
    Location: `City ${index + 1}, State`,
    Image_URL: "/images/rockwellRumble.webp",
    Entry_Type: index % 2 === 0 ? EntryTypeENUM.team : EntryTypeENUM.wrestler,
    Early_Bird_Pricing: new Prisma.Decimal(45.0),
    Early_Bird_Start_Date: new Date(2023, 11, 1),
    Early_Bird_End_Date: new Date(2023, 11, 15),
    Regular_Pricing: new Prisma.Decimal(60.0),
    Regular_Start_Date: new Date(2023, 11, 16),
    Regular_End_Date: new Date(2023, 11, 30),
    Last_Minute_Pricing: new Prisma.Decimal(75.0),
    Last_Minute_Start_Date: new Date(2023, 12, 1),
    Last_Minute_End_Date: new Date(2023, 12, 15),
    At_Door_Pricing: new Prisma.Decimal(90.0),
    At_Door_Start_Date: new Date(2023, 12, 16),
    At_Door_End_Date: new Date(2024, 0, index + 1),
    Spectator_Pricing: new Prisma.Decimal(10.0),
    Number_Of_Mats: 8,
    Contact_Email: "contact@wrestlingevent.com",
    Contact_Phone: "123-456-7890",
    X_Link: "https://x.com/event",
    Instagram_Link: "https://instagram.com/event",
    Facebook_Link: "https://facebook.com/event",
    Website_Link: "https://wrestlingevent.com",
    Terms_And_Conditions: "Standard terms and conditions apply",
    Terms_And_Conditions_PDF_URL: "https://example.com/terms.pdf",
    Attendees: Math.floor(Math.random() * 200) + 50,
    Created_By_ID: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

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
        <div className="flex space-x-4 w-max">
          {events.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      </div>
    </>
  );
}
