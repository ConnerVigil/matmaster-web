import { prisma } from "@/lib/prisma";
import { CreateEventDraftRequest } from "@/types/requests";
import { getSession } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const event: CreateEventDraftRequest = await request.json();
    const session = await getSession();

    if (!session || !session.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { Auth0_ID: session.user.sub },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const createdEvent = await prisma.event.create({
      data: {
        Status: event.status,
        Name: event.eventName,
        Start_Date: new Date(event.tournamentStartDate),
        End_Date: new Date(event.tournamentEndDate),
        Number_Mats: event.numberMats,
        USA_Wrestling_Event: event.usaWrestlingEvent,
        Style: event.style,
        Description: event.moreInfo,
        Location: event.location,
        Image_URL: event.eventImage,
        Early_Bird_Pricing: event.earlyBirdPrice,
        Early_Bird_Start_Date: event.earlyBirdCollectionDatesStart
          ? new Date(event.earlyBirdCollectionDatesStart)
          : null,
        Early_Bird_End_Date: event.earlyBirdCollectionDatesEnd
          ? new Date(event.earlyBirdCollectionDatesEnd)
          : null,
        Early_Bird_Entry_Type: event.earlyBirdEntryType,
        Regular_Pricing: event.regularPrice,
        Regular_Start_Date: event.regularCollectionDatesStart
          ? new Date(event.regularCollectionDatesStart)
          : null,
        Regular_End_Date: event.regularCollectionDatesEnd
          ? new Date(event.regularCollectionDatesEnd)
          : null,
        Regular_Entry_Type: event.regularEntryType,
        Last_Minute_Pricing: event.lastMinutePrice,
        Last_Minute_Start_Date: event.lastMinuteCollectionDatesStart
          ? new Date(event.lastMinuteCollectionDatesStart)
          : null,
        Last_Minute_End_Date: event.lastMinuteCollectionDatesEnd
          ? new Date(event.lastMinuteCollectionDatesEnd)
          : null,
        Last_Minute_Entry_Type: event.lastMinuteEntryType,
        At_Door_Pricing: event.atTheDoorPrice,
        At_Door_Start_Date: event.atTheDoorCollectionDatesStart
          ? new Date(event.atTheDoorCollectionDatesStart)
          : null,
        At_Door_End_Date: event.atTheDoorCollectionDatesEnd
          ? new Date(event.atTheDoorCollectionDatesEnd)
          : null,
        At_Door_Entry_Type: event.atTheDoorEntryType,
        Spectator_Pricing: event.spectatorPrice,
        Contact_Email: event.contactEmail,
        Contact_Phone: event.contactPhone,
        X_Link: event.twitterHandle,
        Instagram_Link: event.instagramHandle,
        Facebook_Link: event.facebookHandle,
        Terms_And_Conditions: event.termsAndConditions,
        Created_By_ID: user.ID,
      },
    });

    if (!createdEvent) {
      return NextResponse.json(
        { error: "Failed to create event" },
        { status: 500 }
      );
    }

    return NextResponse.json({ event: createdEvent }, { status: 200 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
