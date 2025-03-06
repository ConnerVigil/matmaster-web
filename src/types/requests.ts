import {
  EntryTypeENUM,
  EventStatusENUM,
  EventTypeENUM,
  StyleENUM,
} from "@prisma/client";

export interface CreateEventDraftRequest {
  Status: EventStatusENUM;
  Name: string;
  Event_Type: EventTypeENUM;
  Start_Date: string;
  End_Date: string;
  Style: StyleENUM;
  More_Info?: string;
  Location: string;
  Image_URL?: string;
  Entry_Type: EntryTypeENUM;

  Early_Bird_Pricing?: number;
  Early_Bird_Start_Date?: string;
  Early_Bird_End_Date?: string;

  Regular_Pricing: number;
  Regular_Start_Date?: string;
  Regular_End_Date?: string;

  Last_Minute_Pricing?: number;
  Last_Minute_Start_Date?: string;
  Last_Minute_End_Date?: string;

  At_Door_Pricing?: number;
  At_Door_Start_Date?: string;
  At_Door_End_Date?: string;

  Spectator_Pricing?: number;
  Number_Of_Mats?: number;
  Contact_Email: string;
  Contact_Phone: string;
  X_Link?: string;
  Instagram_Link?: string;
  Facebook_Link?: string;
  Website_Link?: string;
  Terms_And_Conditions?: string;
  Terms_And_Conditions_PDF_URL?: string;
}
