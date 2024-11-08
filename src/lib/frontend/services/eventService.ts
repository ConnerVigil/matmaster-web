import { CreateEventDraftRequest } from "@/types/requests";
import { Event } from "@prisma/client";

export const eventService = {
  async createEventAsDraft(event: CreateEventDraftRequest): Promise<Event> {
    try {
      const response = await fetch("/api/event", {
        method: "POST",
        body: JSON.stringify(event),
      });

      if (!response.ok) {
        throw new Error("Failed to create event as draft");
      }

      return (await response.json()).event;
    } catch (error) {
      console.error("Error creating event as draft:", error);
      throw error;
    }
  },

  async publishEvent(eventId: number): Promise<Event> {
    try {
      const response = await fetch(`/api/event/${eventId}/publish`, {
        method: "PUT",
      });

      if (!response.ok) {
        throw new Error("Failed to publish event");
      }

      return (await response.json()).event;
    } catch (error) {
      console.error("Error publishing event:", error);
      throw error;
    }
  },
};
