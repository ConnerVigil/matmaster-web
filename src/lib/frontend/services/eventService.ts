import { TournamentDatabaseData } from "@/app/createTournaments/zodSchemas";
import { CreateEventDraftRequest } from "@/types/requests";
import { Event, EventStatus, EventTypeENUM } from "@prisma/client";

export const eventService = {
  async createEventAsDraft(
    event: TournamentDatabaseData,
    eventType: EventTypeENUM
  ): Promise<Event> {
    const requestBody: CreateEventDraftRequest = {
      Status: EventStatus.DRAFT,
      Name: event.eventName,
      Event_Type: eventType,
      Start_Date: event.tournamentDates.start?.toISOString(),
      End_Date: event.tournamentDates.end?.toISOString(),
      Style: event.style,
      More_Info: event.moreInfo,
      Location: event.location,
      Image_URL: event.imageUrl,
      Entry_Type: event.eventEntryType,
      Early_Bird_Pricing: event.earlyBirdPrice,
      Early_Bird_Start_Date:
        event.earlyBirdCollectionDates?.start?.toISOString(),
      Early_Bird_End_Date: event.earlyBirdCollectionDates?.end?.toISOString(),
      Regular_Pricing: event.regularPrice,
      Regular_Start_Date: event.regularCollectionDates.start?.toISOString(),
      Regular_End_Date: event.regularCollectionDates.end?.toISOString(),
      Last_Minute_Pricing: event.lastMinutePrice,
      Last_Minute_Start_Date:
        event.lastMinuteCollectionDates?.start?.toISOString(),
      Last_Minute_End_Date: event.lastMinuteCollectionDates?.end?.toISOString(),
      At_Door_Pricing: event.atTheDoorPrice,
      At_Door_Start_Date: event.atTheDoorCollectionDates?.start?.toISOString(),
      At_Door_End_Date: event.atTheDoorCollectionDates?.end?.toISOString(),
      Spectator_Pricing: event.spectatorPrice,
      Number_Of_Mats: event.numberOfMats,
      Contact_Email: event.emailAddress,
      Contact_Phone: event.phoneNumber,
      X_Link: event.xLink,
      Instagram_Link: event.instagramLink,
      Facebook_Link: event.facebookLink,
      Website_Link: event.websiteLink,
      Terms_And_Conditions: event.termsAndConditions,
      Terms_And_Conditions_PDF_URL: event.documentUrl,
    };

    try {
      const response = await fetch("/api/event", {
        method: "POST",
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to create event as draft");
      }

      return (await response.json()).event as Event;
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

  async getEventById(eventId: number): Promise<Event> {
    try {
      const response = await fetch(`/api/event/${eventId}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch event");
      }

      return (await response.json()).event;
    } catch (error) {
      console.error("Error fetching event:", error);
      throw error;
    }
  },

  async deleteEvent(eventId: number): Promise<void> {
    try {
      const response = await fetch(`/api/event/${eventId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      throw error;
    }
  },

  async getEventsByUserId(userId: number): Promise<Event[]> {
    try {
      const response = await fetch(`/api/event/user/${userId}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch events by user ID");
      }

      return (await response.json()).events as Event[];
    } catch (error) {
      console.error("Error fetching events by user ID:", error);
      throw error;
    }
  },
};
