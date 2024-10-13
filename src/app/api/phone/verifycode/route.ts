import { NextRequest, NextResponse } from "next/server";
import TextLink from "textlink-sms";

export async function POST(req: NextRequest) {
  const { phoneNumber, code } = await req.json();

  TextLink.useKey(process.env.TEXT_LINK_API_KEY as string);

  if (!phoneNumber || !code) {
    return NextResponse.json(
      { error: "Phone number and code are required" },
      { status: 400 }
    );
  }

  const response = await TextLink.verifyCode(phoneNumber, code);

  console.log(response);

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to send verification code" },
      { status: 500 }
    );
  }

  return NextResponse.json({ status: 200 });
}
