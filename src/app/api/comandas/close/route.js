import { connectToDatabase } from "../../lib/dbConnect.js";
import { commands } from "../commandModel.js";
import { users } from "../../user/usersModel.js";
import { getStoreXTenant } from "../../utils/getStoreXTenant.js";
import { closeCommand } from "./controller.js";

export async function POST(request) {
  await connectToDatabase();
  const xTenant = getStoreXTenant(request);
  const { searchParams } = new URL(request.url);
  const _id = searchParams.get("_id");

  const response = await closeCommand({
    commands,
    users,
    xTenant,
    _id,
  });

  return response;
}
