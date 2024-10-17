import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const id = parseInt(params.id);
    const { firstName, lastName, gender, grade, dateOfBirth } =
      await request.json();

    const user = await prisma.user.update({
      where: { ID: id },
      data: {
        First_Name: firstName,
        Last_Name: lastName,
        Gender: gender,
        Grade: grade,
        DOB: new Date(dateOfBirth),
        Onboarding_Complete: true,
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
