import { connectToDatabase } from "../lib/dbConnect.js";
import { commands } from "../comandas/commandModel.js";
import { products } from "../items/productModel.js";
import { users } from "../user/usersModel.js";
import { categories } from "../category/categoryModel.js";
import { getStoreXTenant } from "../utils/getStoreXTenant.js";
import { getData } from "./controller.js";

export async function GET(request) {
  await connectToDatabase();
  const { searchParams } = new URL(request.url);
  const tenantParam = searchParams?.get("tenant");
  const xTenant = getStoreXTenant(request);

  const response = getData({
    categories,
    commands,
    products,
    users,
    xTenant,
    tenantParam
  });
  return response;
}