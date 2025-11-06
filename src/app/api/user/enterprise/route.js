import { connectToDatabase } from "../../lib/dbConnect";
import { users } from "../usersModel.js";
import { tenants } from "../tenantModel";
import { createEnterprise } from "../controller.js";

export async function POST(request) {
  await connectToDatabase();
  const body = await request.json();
  const response = await createEnterprise({ tenants, users, body });

  return response;
}
