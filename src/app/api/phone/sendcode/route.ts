import { NextRequest, NextResponse } from "next/server";
import TextLink from "textlink-sms";

export async function POST(req: NextRequest) {
  const phoneNumber = await req.json();
  console.log(phoneNumber);

  TextLink.useKey(process.env.TEXT_LINK_API_KEY as string);

  if (!phoneNumber) {
    return NextResponse.json(
      { error: "Phone number is required" },
      { status: 400 }
    );
  }

  const verificationOptions = {
    service_name: "MatMaster",
    expiration_time: 10 * 60 * 1000,
    source_country: "US",
  };

  const response = await TextLink.sendVerificationSMS(
    phoneNumber,
    verificationOptions
  );

  console.log(response);

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to send verification code" },
      { status: 500 }
    );
  }

  return NextResponse.json({ code: response.code }, { status: 200 });
}
