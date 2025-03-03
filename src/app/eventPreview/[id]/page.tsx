"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import LoadingSpinner from "../../../lib/frontend/LoadingSpinner";
import PreviewEvent from "../PreviewEvent";
import { eventService } from "@/lib/frontend/services/eventService";
import { Event } from "@prisma/client";

const CreateEventPage = ({ params }: { params: { id: string } }) => {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [event, setEvent] = React.useState<Event | null>(null);
  const [isEventLoading, setIsEventLoading] = React.useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/api/auth/login");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await eventService.getEventById(parseInt(params.id));
        setEvent(eventData);
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setIsEventLoading(false);
      }
    };

    if (!isLoading && user) {
      fetchEvent();
    }
  }, [params.id, isLoading, user]);

  if (isLoading || isEventLoading) {
    return <LoadingSpinner />;
  }

  if (!event) {
    return <div>Event not found</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="bg-white">
      <div className="shadow-2xl container mx-auto max-w-3xl pb-4">
        <PreviewEvent event={event} />
      </div>
    </div>
  );
};

export default CreateEventPage;
