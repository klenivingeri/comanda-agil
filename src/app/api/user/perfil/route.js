import { connectToDatabase } from "../../lib/dbConnect";
import { users } from "../usersModel.js";
import { getUserPerfil } from "../controller.js";
import { getStoreXTenant } from "../../utils/getStoreXTenant";

export async function GET(request) {
  await connectToDatabase();
  const xTenant = getStoreXTenant(request);
  const { searchParams } = new URL(request.url);
  const _id = searchParams.get("_id");

  const response = await getUserPerfil({ users, xTenant, _id });

  return response;
}
