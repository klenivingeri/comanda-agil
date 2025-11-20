import { storage } from "../lib/bucketConnect";

export const deleteImage = async (url) => {
  try {
    const baseURl = `https://storage.googleapis.com/${process.env.GCP_BUCKET_NAME}/`;
    let fileKey = null;
    if (url) {
      fileKey = url.replace(baseURl, "");
    }

    const bucket = storage.bucket(process.env.GCP_BUCKET_NAME);
    await bucket.file(fileKey).delete();

    return true
  } catch (_) {
    return false
  }
};
