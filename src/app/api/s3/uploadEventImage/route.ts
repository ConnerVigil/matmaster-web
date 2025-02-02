import { NextRequest, NextResponse } from "next/server";
import s3Client from "@/lib/backend/awsS3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(req: NextRequest) {
  try {
    const { fileId } = await req.json();

    console.log("fileId", fileId);

    if (!fileId) {
      return NextResponse.json(
        { message: "File Id is required" },
        { status: 400 }
      );
    }

    const signedUrl = await createPresignedPost(s3Client, {
      Bucket: process.env.AWS_S3_BUCKET_EVENT_IMAGES!,
      Key: fileId,
      Expires: 60,
      Conditions: [["content-length-range", 0, MAX_FILE_SIZE]],
    });

    return NextResponse.json({ signedUrl });
  } catch (error) {
    console.error("Error generating signed URL for event image:", error);
    return NextResponse.json(
      { message: "Error generating signed URL for event image" },
      { status: 500 }
    );
  }
}
