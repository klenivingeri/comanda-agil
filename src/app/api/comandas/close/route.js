import { connectToDatabase } from "../../lib/dbConnect.js";
import { commands } from "../commandModel.js";
import { getStoreXTenant } from "../../utils/getStoreXTenant.js";
import { putCloseCommands } from "../controller.js";

export async function POST(request) {
  await connectToDatabase();
  const xTenant = getStoreXTenant(request);
  const { searchParams } = new URL(request.url);
  const _id = searchParams.get("_id");
  const paymentMethod = searchParams.get("paymentMethod");
  const statusId = searchParams.get("statusId");

  const response = await putCloseCommands({
    commands,
    xTenant,
    paymentMethod,
    statusId,
    _id,
  });

  return response;
}
