import { connectToDatabase } from "../lib/dbConnect.js";
import { commands } from "./commandModel.js";
import { products } from "../items/productModel.js";
import { users } from "../user/usersModel.js";
import { categories } from "../category/categoryModel.js";
import { tenants } from "../user/tenantModel.js";
import { getStoreXTenant } from "../utils/getStoreXTenant.js";
import {
  getCommands,
  postCommands,
  putCommands,
  deleteCommands,
} from "./controller.js";

export async function GET(request) {
  await connectToDatabase();
  const { searchParams } = new URL(request.url);
  const _id = searchParams.get("_id");
  const code = searchParams.get("code");
  const xTenant = getStoreXTenant(request);

  const response = getCommands({
    categories,
    commands,
    products,
    tenants,
    users,
    xTenant,
    code,
    _id,
  });
  return response;
}

export async function POST(request) {
  await connectToDatabase();
  const xTenant = getStoreXTenant(request);
  const body = await request.json();

  const response = await postCommands({
    categories,
    commands,
    products,
    xTenant,
    users,
    body,
  });

  return response;
}

export async function PUT(request) {
  await connectToDatabase();
  const { searchParams } = new URL(request.url);
  const _id = searchParams.get("_id");
  const xTenant = getStoreXTenant(request);
  const body = await request.json();

  const response = await putCommands({
    categories,
    commands,
    products,
    xTenant,
    users,
    body,
    _id,
  });

  return response;
}

export async function DELETE(request) {
  await connectToDatabase();
  const { searchParams } = new URL(request.url);
  const _id = searchParams.get("_id");
  const itemUUID = searchParams.get("itemUUID");
  const restValue = searchParams.get("rest");

  const xTenant = getStoreXTenant(request);

  const response = await deleteCommands({
    categories,
    commands,
    products,
    xTenant,
    itemUUID,
    restValue,
    users,
    _id,
  });

  return response;
}
