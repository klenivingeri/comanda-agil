import { connectToDatabase } from "../lib/dbConnect";
import { categories } from "../category/categoryModel";
import { product } from "./productModel";
import {
  getProducts,
  postProducts,
  deleteProdutcs,
  putProducts,
} from "./controller.js";
import { getStoreXTenant } from "../utils/getStoreXTenant.js";

export async function GET(request) {
  const xTenant = getStoreXTenant(request);
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const response = getProducts({
    connectToDatabase,
    product,
    categories,
    xTenant,
    id,
  });

  return response;
}

export async function POST(request) {
  const xTenant = getStoreXTenant(request);
  const body = await request.json();

  const response = postProducts({
    connectToDatabase,
    product,
    categories,
    xTenant,
    body,
  });

  return response;
}

export async function PUT(request) {
  const xTenant = getStoreXTenant(request);
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const body = await request.json();

  const response = await putProducts({
    connectToDatabase,
    product,
    categories,
    xTenant,
    body,
    id,
  });

  return response;
}

export async function DELETE(request) {
  const xTenant = getStoreXTenant(request);
  const body = await request.json();

  const response = await deleteProdutcs({
    connectToDatabase,
    product,
    categories,
    xTenant,
    body,
  });

  return response;
}
