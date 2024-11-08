import { EventStatus } from "@prisma/client";
import { Dayjs } from "dayjs";

export interface CreateEventDraftRequest {
  status: EventStatus;
  eventImage: string;
  eventName: string;
  tournamentDates: {
    start: Dayjs;
    end: Dayjs;
  };
  location: string;
  style: string;
  moreInfo?: string;
  earlyBirdPrice?: string;
  earlyBirdType?: string;
  earlyBirdCollectionDates?: {
    start: Dayjs;
    end: Dayjs;
  };
  regularPrice: string;
  regularType: string;
  regularCollectionDates: {
    start: Dayjs;
    end: Dayjs;
  };
  lastMinutePrice?: string;
  lastMinuteType?: string;
  lastMinuteCollectionDates?: {
    start: Dayjs;
    end: Dayjs;
  };
  atTheDoorPrice?: string;
  atTheDoorType?: string;
  atTheDoorCollectionDates?: {
    start: Dayjs;
    end: Dayjs;
  };
  spectatorPrice?: string;
  spectatorDuration?: string;
  emailAddress: string;
  phoneNumber: string;
  twitterHandle?: string;
  instagramHandle?: string;
  facebookHandle?: string;
  termsAndConditions?: string;
}
