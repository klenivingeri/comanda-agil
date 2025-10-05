import { connectToDatabase } from "../../lib/dbConnect.js";
import { commands } from "../commandModel.js";
import { getStoreXTenant } from "../../utils/getStoreXTenant.js";
import { getCommandsForUser } from "../controller.js";

export async function GET(request) {
  await connectToDatabase();
  const xTenant = getStoreXTenant(request);

  const response = getCommandsForUser({
    commands,
    xTenant,
  });

  return response;
}
