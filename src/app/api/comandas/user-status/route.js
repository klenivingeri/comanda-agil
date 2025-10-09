import { connectToDatabase } from "../../lib/dbConnect.js";
import { commands } from "../commandModel.js";
import { getStoreXTenant } from "../../utils/getStoreXTenant.js";
import { getCommandsForUser } from "../controller.js";
import { dailySalesReport } from "../userStatusModel.js";

export async function GET(request) {
  await connectToDatabase();
  const xTenant = getStoreXTenant(request);

  const response = getCommandsForUser({
    dailySalesReport,
    commands,
    xTenant,
  });

  return response;
}
