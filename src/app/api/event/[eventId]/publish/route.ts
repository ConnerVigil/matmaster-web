import { prisma } from "@/lib/prisma";
import { EventStatus } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { eventId: string } }
): Promise<NextResponse> {
  try {
    const eventId = parseInt(params.eventId);

    const updatedEvent = await prisma.event.update({
      where: { ID: eventId },
      data: { Status: EventStatus.PUBLISHED },
    });

    return NextResponse.json(updatedEvent, { status: 200 });
  } catch (error) {
    console.error("Error publishing event:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
