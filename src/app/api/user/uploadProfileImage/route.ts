import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { prisma } from "@/lib/prisma";
import s3Client from "@/lib/backend/awsS3";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;
    const userId = formData.get("userId") as string;
    console.log("userId: ", userId);
    console.log("file: ", file);

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }

    const fileName = `${userId}-${Date.now()}-${file.name}`;
    const arrayBuffer = await file.arrayBuffer();

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
      Body: Buffer.from(arrayBuffer),
      ContentType: file.type,
    });

    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    });

    await prisma.user.update({
      where: { ID: parseInt(userId) },
      data: {
        Profile_Image_URL: `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`,
      },
    });

    return NextResponse.json({
      url: signedUrl,
      message: "Upload URL generated",
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { message: "Error uploading file" },
      { status: 500 }
    );
  }
}
