import { connectToDatabase } from "../lib/dbConnect.js";

import { tenants } from "../user/tenantModel";

import { getStoreXTenant } from "../utils/getStoreXTenant.js";
import { getSign, postSign } from "./controller.js";

export async function GET(request) {
  await connectToDatabase();
  const { searchParams } = new URL(request.url);
  const xTenant = getStoreXTenant(request);

  const response = getSign({
    tenants,
    xTenant
  });
  return response;
}

export async function POST(request) {
  await connectToDatabase();
  const { searchParams } = new URL(request.url);
  const xTenant = getStoreXTenant(request);

  const response = postSign({
    tenants,
    xTenant
  });
  return response;
}

