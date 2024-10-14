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

  const response = await prisma.verificationCode.findFirst({
    where: {
      Phone_Number: phoneNumber,
      Code: code,
    },
  });

  console.log(response);

  if (!response?.Code) {
    return NextResponse.json({ error: "Code not found" }, { status: 500 });
  }

  return NextResponse.json({ status: 200 });
}
