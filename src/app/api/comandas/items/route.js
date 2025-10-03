import { connectToDatabase } from "../../lib/dbConnect.js";
import { commands } from "../commandModel.js";
import { getStoreXTenant } from "../../utils/getStoreXTenant.js";
import { getCommandsForUser } from "../controller.js";

export async function GET(request) {
  const xTenant = getStoreXTenant(request);

  const response = getCommandsForUser({
    connectToDatabase,
    commands,
    xTenant,
  });

  return response;
}
