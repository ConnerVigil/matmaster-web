import { NextRequest, NextResponse } from "next/server";
import { PublishCommand } from "@aws-sdk/client-sns";
import { SNSClient } from "@aws-sdk/client-sns";
import { prisma } from "@/lib/prisma";

const snsClient = new SNSClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export function generateVerificationCode(length: number = 6): string {
  return Math.random()
    .toString()
    .slice(2, 2 + length);
}

export async function sendVerificationCode(phoneNumber: string, code: string) {
  const params = {
    Message: `Your verification code is: ${code}`,
    PhoneNumber: phoneNumber,
  };

  try {
    const command = new PublishCommand(params);
    const response = await snsClient.send(command);
    console.log("Verification code sent successfully:", response.MessageId);
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

  const verificationCode = generateVerificationCode();
  const success = await sendVerificationCode(phoneNumber, verificationCode);

  console.log("response: ", success);

  if (!success) {
    return NextResponse.json(
      { error: "Failed to send verification code" },
      { status: 500 }
    );
  }

  // TODO: Store the verification code in the database
  const response = await prisma;

  return NextResponse.json({ status: 200 });
}
