import { connectToDatabase } from "../lib/dbConnect";
import { users } from "./usersModel.js";
import { postUser } from "./controller.js";
import { getStoreXTenant } from "../utils/getStoreXTenant";

export async function POST(request) {
  const xTenant = getStoreXTenant(request);
  const body = await request.json();
  const response = postUser({ connectToDatabase, users, xTenant, body });
  return response;
}
