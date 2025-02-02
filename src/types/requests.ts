import { EntryTypeENUM, EventStatus, StyleENUM } from "@prisma/client";

export interface CreateEventDraftRequest {
  status: EventStatus;
  eventImageUrl?: string;
  eventName: string;
  tournamentStartDate: string;
  tournamentEndDate: string;
  numberMats: number;
  usaWrestlingEvent: boolean;
  location: string;
  style: StyleENUM;
  moreInfo?: string;
  entryType: EntryTypeENUM;

  earlyBirdPrice?: string;
  earlyBirdCollectionDatesStart?: string;
  earlyBirdCollectionDatesEnd?: string;

  regularPrice: string;
  regularCollectionDatesStart?: string;
  regularCollectionDatesEnd?: string;

  lastMinutePrice?: string;
  lastMinuteCollectionDatesStart?: string;
  lastMinuteCollectionDatesEnd?: string;

  atTheDoorPrice?: string;
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
