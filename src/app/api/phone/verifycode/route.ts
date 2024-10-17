import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * This endpoint verifies a phone number verification code. It checks if the
 * provided code matches the one stored for the given phone number. If valid,
 * it deletes the verification code entry and updates the user's phone number.
 *
 * @route POST /api/phone/verifycode
 * @param {object} req.body - The request body
 * @param {string} req.body.phoneNumber - The phone number to verify
 * @param {string} req.body.code - The verification code
 * @returns {object} 200 - Success message
 * @returns {object} 400 - Bad request error
 * @returns {object} 500 - Internal server error
 */
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

    await prisma.user.update({
      where: {
        ID: response.User_ID,
      },
      data: {
        Phone_Number: phoneNumber,
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
