import { NextResponse } from "next/server";
import cloudinary from "cloudinary";
import { getENV } from "@/config/env.config";
import { ENV } from "@/enum";
import { UploadApiResponse } from "cloudinary";

cloudinary.v2.config({
  cloud_name: getENV(ENV.CLOUDINARY_NAME),
  api_key: getENV(ENV.CLOUDINARY_API_KEY),
  api_secret: getENV(ENV.CLOUDINARY_API_SECRET),
});

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  try {
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.v2.uploader
        .upload_stream({ folder: "food-app" }, (error, uploadResult) => {
          if (error) return reject(error);
          if (!uploadResult) return reject(new Error("Upload failed"));
          resolve(uploadResult);
        })
        .end(buffer);
    });

    return NextResponse.json(result.secure_url, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
