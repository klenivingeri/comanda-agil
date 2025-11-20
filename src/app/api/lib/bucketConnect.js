import { Storage } from "@google-cloud/storage";

export const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  credentials: JSON.parse(process.env.GCP_KEY),
});
