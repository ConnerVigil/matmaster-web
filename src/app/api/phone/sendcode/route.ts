import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PublishCommand } from "@aws-sdk/client-sns";
import snsClient from "@/lib/backend/awsSns";

export function generateVerificationCode(length: number = 6): string {
  return Math.random()
    .toString()
    .slice(2, 2 + length);
}

export async function sendVerificationCode(
  phoneNumber: string,
  code: string
): Promise<boolean> {
  const params = {
    Message: `Your verification code is: ${code}`,
    PhoneNumber: phoneNumber,
  };

  try {
    const command = new PublishCommand(params);
    const response = await snsClient.send(command);
    console.log("response: ", response);

    return true;
  } catch (error) {
    console.error("Error sending verification code:", error);
    return false;
  }
}

export async function POST(req: NextRequest) {
  const { phoneNumber } = await req.json();

  if (!phoneNumber) {
    return NextResponse.json(
      { error: "Phone number is required" },
      { status: 400 }
    );
  }

  const verificationCode = generateVerificationCode(5);
  console.log("verificationCode generated: ", verificationCode);
  // const success = await sendVerificationCode(phoneNumber, verificationCode);
  // console.log("success: ", success);

  if (!true) {
    return NextResponse.json(
      { error: "Failed to send verification code" },
      { status: 500 }
    );
  }

  await prisma.verificationCode.create({
    data: {
      Phone_Number: phoneNumber,
      Code: verificationCode,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    },
  });

  return NextResponse.json({ status: 200 });
}
