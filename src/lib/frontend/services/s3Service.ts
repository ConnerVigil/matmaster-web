import { v4 as uuidv4 } from "uuid";

export const s3Service = {
  async uploadFileToS3(file: File, bucketName: string): Promise<string> {
    try {
      const tempId = uuidv4();

      const s3Response = await fetch("/api/s3/uploadFile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileId: tempId, bucketName: bucketName }),
      });

      if (!s3Response.ok) {
        throw new Error("Failed to get presigned URL");
      }

      const { signedUrl } = await s3Response.json();

      const formData = new FormData();
      Object.entries(signedUrl.fields).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      formData.append("file", file);
      formData.append("Content-Type", file.type);

      const uploadResponse = await fetch(signedUrl.url, {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        throw new Error(`Failed to upload file to S3: ${errorText}`);
      }

      return `${signedUrl.url}${signedUrl.fields.key}`;
    } catch (error) {
      console.error("Error uploading image to S3:", error);
      throw error;
    }
  },

  // Delete file in s3
};
