import { EntryType, EventStatus } from "@prisma/client";
import { Dayjs } from "dayjs";

export interface CreateEventDraftRequest {
  status: EventStatus;
  eventImage: string;
  eventName: string;
  tournamentStartDate: Dayjs;
  tournamentEndDate: Dayjs;
  location: string;
  style: string;
  moreInfo?: string;

  earlyBirdPrice?: string;
  earlyBirdEntryType?: EntryType;
  earlyBirdCollectionDatesStart?: Dayjs;
  earlyBirdCollectionDatesEnd?: Dayjs;

  regularPrice: string;
  regularEntryType?: EntryType;
  regularCollectionDatesStart?: Dayjs;
  regularCollectionDatesEnd?: Dayjs;

  lastMinutePrice?: string;
  lastMinuteEntryType?: EntryType;
  lastMinuteCollectionDatesStart?: Dayjs;
  lastMinuteCollectionDatesEnd?: Dayjs;

  atTheDoorPrice?: string;
  atTheDoorEntryType?: EntryType;
  atTheDoorCollectionDatesStart?: Dayjs;
  atTheDoorCollectionDatesEnd?: Dayjs;

  spectatorPrice?: string;
  spectatorDuration?: string;
  contactEmail: string;
  contactPhone: string;
  twitterHandle?: string;
  instagramHandle?: string;
  facebookHandle?: string;
  termsAndConditions?: string;
}
