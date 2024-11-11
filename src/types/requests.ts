import { EntryType, EventStatus } from "@prisma/client";

export interface CreateEventDraftRequest {
  status: EventStatus;
  eventImage: string;
  eventName: string;
  tournamentStartDate: string;
  tournamentEndDate: string;
  numberMats: number;
  usaWrestlingEvent: boolean;
  location: string;
  style: string;
  moreInfo?: string;

  earlyBirdPrice?: string;
  earlyBirdEntryType?: EntryType;
  earlyBirdCollectionDatesStart?: string;
  earlyBirdCollectionDatesEnd?: string;

  regularPrice: string;
  regularEntryType?: EntryType;
  regularCollectionDatesStart?: string;
  regularCollectionDatesEnd?: string;

  lastMinutePrice?: string;
  lastMinuteEntryType?: EntryType;
  lastMinuteCollectionDatesStart?: string;
  lastMinuteCollectionDatesEnd?: string;

  atTheDoorPrice?: string;
  atTheDoorEntryType?: EntryType;
  atTheDoorCollectionDatesStart?: string;
  atTheDoorCollectionDatesEnd?: string;

  spectatorPrice?: string;
  spectatorDuration?: string;
  contactEmail: string;
  contactPhone: string;
  twitterHandle?: string;
  instagramHandle?: string;
  facebookHandle?: string;
  termsAndConditions?: string;
}
