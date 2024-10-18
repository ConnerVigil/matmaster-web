import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { fileName, userId } = await req.json();
    console.log("fileName: ", fileName);
    console.log("userId: ", userId);

    await prisma.user.update({
      where: { ID: userId },
      data: {
        Profile_Image_URL: fileName,
      },
    });

    return NextResponse.json({
      message: "Profile image updated",
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { message: "Error uploading file" },
      { status: 500 }
    );
  }
}
