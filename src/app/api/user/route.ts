import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const {
      Username,
      Email,
      DOB,
      Parental_Consent,
      Worker_ID,
      Participant_ID,
      Coach_ID,
      Coordinator_ID,
      Is_Viewer,
      Is_Active,
    } = await request.json();

    const user = await prisma.user.create({
      data: {
        Username,
        Email,
        DOB: new Date(DOB),
        Parental_Consent,
        Worker_ID,
        Participant_ID,
        Coach_ID,
        Coordinator_ID,
        Is_Viewer,
        Is_Active,
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
