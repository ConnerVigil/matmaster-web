import { EventDatabase } from "@/app/createTournaments/zodSchemas";
import { CreateEventDraftRequest } from "@/types/requests";
import { Event, EventStatus } from "@prisma/client";

export const eventService = {
  async createEventAsDraft(event: EventDatabase): Promise<Event> {
    const requestBody: CreateEventDraftRequest = {
      Status: EventStatus.DRAFT,
      Name: event.eventName,
      Start_Date: event.tournamentDates.start,
      End_Date: event.tournamentDates.end,
      Style: event.style,
      More_Info: event.moreInfo,
      Location: event.location,
      Image_URL: event.imageUrl,
      Entry_Type: event.eventEntryType,
      Early_Bird_Pricing: event.earlyBirdPrice,
      Early_Bird_Start_Date: event.earlyBirdCollectionDates?.start,
      Early_Bird_End_Date: event.earlyBirdCollectionDates?.end,
      Regular_Pricing: event.regularPrice,
      Regular_Start_Date: event.regularCollectionDates.start,
      Regular_End_Date: event.regularCollectionDates.end,
      Last_Minute_Pricing: event.lastMinutePrice,
      Last_Minute_Start_Date: event.lastMinuteCollectionDates?.start,
      Last_Minute_End_Date: event.lastMinuteCollectionDates?.end,
      At_Door_Pricing: event.atTheDoorPrice,
      At_Door_Start_Date: event.atTheDoorCollectionDates?.start,
      At_Door_End_Date: event.atTheDoorCollectionDates?.end,
      Spectator_Pricing: event.spectatorPrice,
      Contact_Email: event.emailAddress,
      Contact_Phone: event.phoneNumber,
      X_Link: event.xHandle,
      Instagram_Link: event.instagramHandle,
      Facebook_Link: event.facebookHandle,
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
};
