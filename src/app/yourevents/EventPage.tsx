"use client";

import EventCard from "@/components/EventCard";
import { useUser } from "@auth0/nextjs-auth0/client";
import { userService } from "@/lib/frontend/services/userService";
import { eventService } from "@/lib/frontend/services/eventService";
import { Event } from "@prisma/client";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/lib/frontend/LoadingSpinner";
import { formatDate } from "@/utils/dateFormatter";

const EventPage = () => {
  const { user } = useUser();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        if (user) {
          const dbUser = await userService.getUserFromDB();
          const userEvents = await eventService.getEventsByUserId(dbUser.ID);
          setEvents(userEvents);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [user]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">You don&apos;t have any events yet.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto">
      <div className="flex flex-wrap justify-center gap-4">
        {events.map((event, index) => (
          <EventCard
            key={index}
            title={event.Name || "Untitled Event"}
            dateRange={`${formatDate(
              new Date(event.Start_Date)
            )} - ${formatDate(new Date(event.End_Date))}`}
            attendees={0}
            style={event.Style || ""}
            location={event.Location || ""}
            price={event.Regular_Pricing.toString() || "0"}
            imageSource={event.Image_URL || null}
            draft={event.Status === "DRAFT"}
            eventId={event.ID}
          />
        ))}
      </div>
    </div>
  );
};

export default EventPage;
