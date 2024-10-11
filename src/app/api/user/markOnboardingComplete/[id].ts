import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  console.log("MarkOnboardingComplete route called");
  console.log("Params:", params);

  const id = parseInt(params.id);

  try {
    const user = await prisma.user.update({
      where: { ID: Number(id) },
      data: { Onboarding_Complete: true },
    });

    console.log("User updated:", user);

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
