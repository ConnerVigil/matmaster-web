import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { imageUrl, userId } = await req.json();

    await prisma.user.update({
      where: { ID: userId },
      data: {
        Profile_Image_URL: imageUrl,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { message: "Error uploading file" },
      { status: 500 }
    );
  }
}
