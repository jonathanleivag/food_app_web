import { NextResponse } from "next/server";
import cloudinary from "cloudinary";
import { getENV } from "@/config/env.config";
import { ENV } from "@/enum";

cloudinary.v2.config({
  cloud_name: getENV(ENV.CLOUDINARY_NAME),
  api_key: getENV(ENV.CLOUDINARY_API_KEY),
  api_secret: getENV(ENV.CLOUDINARY_API_SECRET),
});

export async function DELETE(request: Request) {
  const body = await request.json();
  const { secure_url } = body;

  if (!secure_url) {
    return NextResponse.json({ error: "Missing secure_url" }, { status: 400 });
  }

  try {
    const urlParts = secure_url.split("/");
    const fileWithExtension = urlParts.slice(-1)[0];
    const folder = urlParts[urlParts.length - 2];
    const public_id = `${folder}/${fileWithExtension.split(".")[0]}`;

    const result = await cloudinary.v2.uploader.destroy(public_id);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
