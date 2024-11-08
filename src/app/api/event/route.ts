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
        Start_Date: event.tournamentDates.start.toDate(),
        End_Date: event.tournamentDates.end.toDate(),
      },
    });

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
