import { connectToDatabase } from "../../../lib/dbConnect.js";
import { commands } from "../../commandModel.js";
import { getStoreXTenant } from "../../../utils/getStoreXTenant.js";
import {
  reportCategories,
} from "../controller.js";

export async function GET(request) {
  await connectToDatabase();
  const { searchParams } = new URL(request.url);
  const period = searchParams.get("period");
  const xTenant = getStoreXTenant(request);

  const response = reportCategories({
    commands,
    xTenant,
    period,
  });
  return response;
}