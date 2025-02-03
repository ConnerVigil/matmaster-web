import { EntryTypeENUM, EventStatus, StyleENUM } from "@prisma/client";

export interface CreateEventDraftRequest {
  Status: EventStatus;
  Name: string;
  Start_Date: Date;
  End_Date: Date;
  Style: StyleENUM;
  More_Info?: string;
  Location: string;
  Image_URL?: string;
  Entry_Type: EntryTypeENUM;

  Early_Bird_Pricing?: string;
  Early_Bird_Start_Date?: Date;
  Early_Bird_End_Date?: Date;

  Regular_Pricing: string;
  Regular_Start_Date?: Date;
  Regular_End_Date?: Date;

  Last_Minute_Pricing?: string;
  Last_Minute_Start_Date?: Date;
  Last_Minute_End_Date?: Date;

  At_Door_Pricing?: string;
  At_Door_Start_Date?: Date;
  At_Door_End_Date?: Date;

  Spectator_Pricing?: string;
  Contact_Email: string;
  Contact_Phone: string;
  X_Link?: string;
  Instagram_Link?: string;
  Facebook_Link?: string;
  Terms_And_Conditions?: string;
  Terms_And_Conditions_PDF_URL?: string;
}
