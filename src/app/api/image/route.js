import { NextResponse } from "next/server";
import { storage } from "../lib/bucketConnect";
import { getStoreXTenant } from "../utils/getStoreXTenant";

export async function POST(request) {
  const xTenant = getStoreXTenant(request);
  const { searchParams } = new URL(request.url);
  const hasUrlFile = searchParams.get("urlFile");
  const baseURl = `https://storage.googleapis.com/${process.env.GCP_BUCKET_NAME}/`;
  let fileKey = null;
  if (hasUrlFile) {
    fileKey = hasUrlFile.replace(baseURl, "");
  }

  try {
    const form = await request.formData();
    const file = form.get("file");

    if (!file) {
      return NextResponse.json(
        { message: "Nenhum arquivo enviado" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = fileKey || `${xTenant.id}-${file.name}`;

    const bucket = storage.bucket(process.env.GCP_BUCKET_NAME);
    const savedFile = bucket.file(filename);

    await savedFile.save(buffer, {
      contentType: file.type,
      public: true,
    });

    const publicUrl = `${baseURl}${filename}`;

    return NextResponse.json({
      url: publicUrl,
      filename,
    });
  } catch (e) {
    return NextResponse.json({ message: "Falha no upload" }, { status: 500 });
  }
}
