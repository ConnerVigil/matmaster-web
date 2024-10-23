import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import s3Client from "@/lib/backend/awsS3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { v4 as uuidv4 } from "uuid";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { message: "UserId is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { ID: userId },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const randomId = uuidv4();

    const signedUrl = await createPresignedPost(s3Client, {
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: `${user.ID}/${randomId}`,
      Expires: 60,
      Conditions: [["content-length-range", 0, MAX_FILE_SIZE]],
    });

    return NextResponse.json({ signedUrl });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return NextResponse.json(
      { message: "Error generating signed URL" },
      { status: 500 }
    );
  }
}
