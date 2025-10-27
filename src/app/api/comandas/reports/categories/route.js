import { connectToDatabase } from "../../../lib/dbConnect.js";
import { commands } from "../../commandModel.js";
import { products } from "../../../items/productModel.js";
import { users } from "../../../user/usersModel.js";
import { categories } from "../../../category/categoryModel.js";
import { tenants } from "../../../user/tenantModel.js";
import { getStoreXTenant } from "../../../utils/getStoreXTenant.js";
import {
  reportCategories,
} from "../controller.js";

export async function GET(request) {
  await connectToDatabase();
  const { searchParams } = new URL(request.url);
  const _id = searchParams.get("_id");
  const xTenant = getStoreXTenant(request);

  const response = reportCategories({
    categories,
    commands,
    products,
    tenants,
    users,
    xTenant,
    _id,
  });
  return response;
}