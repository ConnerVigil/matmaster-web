import { NextRequest, NextResponse } from "next/server";
// import { PutObjectCommand } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { prisma } from "@/lib/prisma";
import s3Client from "@/lib/backend/awsS3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    const user = await prisma.user.findUnique({
      where: { ID: userId },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const randomId = Math.random().toString(36).substring(2, 15);

    const signedUrl = await createPresignedPost(s3Client, {
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: `${user.ID}/${randomId}`,
      Expires: 60,
      Conditions: [
        ["content-length-range", 0, MAX_FILE_SIZE],
        ["starts-with", "$Content-Type", "image/"],
      ],
    });

    // const command = new PutObjectCommand({
    //   Bucket: process.env.AWS_S3_BUCKET_NAME,
    //   Key: `${user.ID}/${randomId}`,
    // });

    // const signedUrl = await getSignedUrl(s3Client, command, {
    //   expiresIn: 60,
    // });
    console.log("signedUrl: ", signedUrl);

    return NextResponse.json({ signedUrl });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { message: "Error getting signed url" },
      { status: 500 }
    );
  }
}
