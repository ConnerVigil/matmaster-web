import { FormData } from "@/app/createTournaments/CreateEvent";
import { CreateEventDraftRequest } from "@/types/requests";
import { Event, EventStatus } from "@prisma/client";

export const eventService = {
  async createEventAsDraft(event: FormData): Promise<Event> {
    const requestBody: CreateEventDraftRequest = {
      status: EventStatus.DRAFT,
      eventImage: event.eventImage,
      eventName: event.eventName,
      tournamentStartDate: event.tournamentDates.start.toISOString(),
      tournamentEndDate: event.tournamentDates.end.toISOString(),
      numberMats: 123,
      usaWrestlingEvent: false,
      location: event.location,
      style: event.style,
      moreInfo: event.moreInfo,
      earlyBirdPrice: event.earlyBirdPrice,
      earlyBirdEntryType: event.earlyBirdEntryType,
      earlyBirdCollectionDatesStart:
        event.earlyBirdCollectionDates?.start?.toISOString(),
      earlyBirdCollectionDatesEnd:
        event.earlyBirdCollectionDates?.end?.toISOString(),
      regularPrice: event.regularPrice,
      regularEntryType: event.regularEntryType,
      regularCollectionDatesStart:
        event.regularCollectionDates.start.toISOString(),
      regularCollectionDatesEnd: event.regularCollectionDates.end.toISOString(),
      lastMinutePrice: event.lastMinutePrice,
      lastMinuteEntryType: event.lastMinuteEntryType,
      lastMinuteCollectionDatesStart:
        event.lastMinuteCollectionDates?.start?.toISOString(),
      lastMinuteCollectionDatesEnd:
        event.lastMinuteCollectionDates?.end?.toISOString(),
      atTheDoorPrice: event.atTheDoorPrice,
      atTheDoorEntryType: event.atTheDoorEntryType,
      atTheDoorCollectionDatesStart:
        event.atTheDoorCollectionDates?.start?.toISOString(),
      atTheDoorCollectionDatesEnd:
        event.atTheDoorCollectionDates?.end?.toISOString(),
      spectatorPrice: event.spectatorPrice,
      spectatorDuration: event.spectatorDuration,
      contactEmail: event.emailAddress,
      contactPhone: event.phoneNumber,
      twitterHandle: event.twitterHandle,
      instagramHandle: event.instagramHandle,
      facebookHandle: event.facebookHandle,
      termsAndConditions: event.termsAndConditions,
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
