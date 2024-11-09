import { prisma } from "@/lib/prisma";
import { CreateEventDraftRequest } from "@/types/requests";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const event: CreateEventDraftRequest = await request.json();

    console.log(event);

    const createdEvent = await prisma.event.create({
      data: {
        Status: event.status,
        Name: event.eventName,
        Start_Date: event.tournamentStartDate.toDate(),
        End_Date: event.tournamentEndDate.toDate(),
        Number_Mats: 10,
        USA_Wrestling_Event: false,
        Style: event.style,
        Description: event.moreInfo,
        Location: event.location,
        Image_URL: event.eventImage,
        Early_Bird_Pricing: event.earlyBirdPrice,
        Early_Bird_Start_Date: event.earlyBirdCollectionDatesStart?.toDate(),
        Early_Bird_End_Date: event.earlyBirdCollectionDatesEnd?.toDate(),
        Early_Bird_Entry_Type: event.earlyBirdEntryType,
        Regular_Pricing: event.regularPrice,
        Regular_Start_Date: event.regularCollectionDatesStart?.toDate(),
        Regular_End_Date: event.regularCollectionDatesEnd?.toDate(),
        Regular_Entry_Type: event.regularEntryType,
        Last_Minute_Pricing: event.lastMinutePrice,
        Last_Minute_Start_Date: event.lastMinuteCollectionDatesStart?.toDate(),
        Last_Minute_End_Date: event.lastMinuteCollectionDatesEnd?.toDate(),
        Last_Minute_Entry_Type: event.lastMinuteEntryType,
        At_Door_Pricing: event.atTheDoorPrice,
        At_Door_Start_Date: event.atTheDoorCollectionDatesStart?.toDate(),
        At_Door_End_Date: event.atTheDoorCollectionDatesEnd?.toDate(),
        At_Door_Entry_Type: event.atTheDoorEntryType,
        Spectator_Pricing: event.spectatorPrice,
        Contact_Email: event.contactEmail,
        Contact_Phone: event.contactPhone,
        X_Link: event.twitterHandle,
        Instagram_Link: event.instagramHandle,
        Facebook_Link: event.facebookHandle,
        Terms_And_Conditions: event.termsAndConditions,
        Created_By_ID: 1,
      },
    });

    console.log(createdEvent);

    if (!createdEvent) {
      return NextResponse.json(
        { error: "Failed to create event" },
        { status: 500 }
      );
    }

    return NextResponse.json(createdEvent, { status: 200 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
