import { v4 as uuidv4 } from "uuid";

export const s3Service = {
  async uploadEventImageToS3(file: File): Promise<string> {
    try {
      const tempId = uuidv4();

      console.log("tempId", tempId);

      const s3Response = await fetch("/api/s3/uploadEventImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileId: tempId }),
      });

      console.log("s3Response", s3Response);

      if (!s3Response.ok) {
        throw new Error("Failed to get presigned URL");
      }

      const { signedUrl } = await s3Response.json();

      console.log("signedUrl", signedUrl);

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

      console.log("uploadResponse", uploadResponse);

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        throw new Error(`Failed to upload image to S3: ${errorText}`);
      }

      return `${signedUrl.url}${signedUrl.fields.key}`;
    } catch (error) {
      console.error("Error uploading image to S3:", error);
      throw error;
    }
  },

  async uploadTandCsToS3(file: File): Promise<string> {
    try {
      const tempId = uuidv4();

      console.log("tempId", tempId);

      const s3Response = await fetch("/api/s3/uploadTandCs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileId: tempId }),
      });

      console.log("s3Response", s3Response);

      if (!s3Response.ok) {
        throw new Error("Failed to get presigned URL");
      }

      const { signedUrl } = await s3Response.json();

      console.log("signedUrl", signedUrl);

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

      console.log("uploadResponse", uploadResponse);

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        throw new Error(`Failed to upload file to S3: ${errorText}`);
      }

      return `${signedUrl.url}${signedUrl.fields.key}`;
    } catch (error) {
      console.error("Error uploading file to S3:", error);
      throw error;
    }
  },
};
