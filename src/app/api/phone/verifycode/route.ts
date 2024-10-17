import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { phoneNumber, code } = await req.json();

  if (!phoneNumber || !code) {
    return NextResponse.json(
      { error: "Phone number and code are required" },
      { status: 400 }
    );
  }

  try {
    const response = await prisma.verificationCode.findFirst({
      where: {
        Phone_Number: phoneNumber,
        Code: code,
      },
    });

    if (!response) {
      return NextResponse.json(
        { error: "Invalid code or phone number" },
        { status: 400 }
      );
    }

    await prisma.verificationCode.delete({
      where: {
        ID: response.ID,
      },
    });

    return NextResponse.json(
      { message: "Code verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying code:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
