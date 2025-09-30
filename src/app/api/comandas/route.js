import { connectToDatabase } from "../lib/dbConnect.js";
import { commands } from "./commandModel.js";
import { products } from "../items/productModel.js";
import { categories } from "../category/categoryModel.js";
import { tenants } from "../login/create/tenantModel.js";
import { getStoreXTenant } from "../utils/getStoreXTenant.js";
import { getCommands, postCommands, putCommands } from "./controller.js";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const _id = searchParams.get("_id");
  const xTenant = getStoreXTenant(request);

  const response = getCommands({
    connectToDatabase,
    categories,
    commands,
    products,
    tenants,
    xTenant,
    _id,
  });
  return response;
}

export async function POST(request) {
  const xTenant = getStoreXTenant(request);
  const body = await request.json();

  const response = await postCommands({
    connectToDatabase,
    categories,
    commands,
    products,
    xTenant,
    body,
  });

  return response;
}

export async function PUT(request) {
  const { searchParams } = new URL(request.url);
  const _id = searchParams.get("_id");
  const xTenant = getStoreXTenant(request);
  const body = await request.json();

  const response = await putCommands({
    connectToDatabase,
    categories,
    commands,
    products,
    xTenant,
    body,
    _id,
  });

  return response;
}
