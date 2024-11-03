import { Event } from "@prisma/client";

export const eventService = {
  async createEventAsDraft(event: Event): Promise<boolean> {
    try {
      const response = await fetch("/api/event", {
        method: "POST",
        body: JSON.stringify(event),
      });

      if (!response.ok) {
        throw new Error("Failed to create event as draft");
      }

      return true;
    } catch (error) {
      console.error("Error creating event as draft:", error);
      throw error;
    }
  },

  async publishEvent(eventId: number): Promise<boolean> {
    try {
      const response = await fetch(`/api/event/${eventId}/publish`, {
        method: "PUT",
      });

      if (!response.ok) {
        throw new Error("Failed to publish event");
      }

      return true;
    } catch (error) {
      console.error("Error publishing event:", error);
      throw error;
    }
  },
};
