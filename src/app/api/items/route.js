import { connectToDatabase } from "../lib/dbConnect";
import { categories } from "../category/categoryModel";
import { products } from "./productModel";
import {
  getProducts,
  postProducts,
  deleteProdutcs,
  putProducts,
} from "./controller.js";
import { getStoreXTenant } from "../utils/getStoreXTenant.js";

export async function GET(request) {
  await connectToDatabase();
  const xTenant = getStoreXTenant(request);
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const response = getProducts({
    products,
    categories,
    xTenant,
    id,
  });

  return response;
}

export async function POST(request) {
  await connectToDatabase();
  const xTenant = getStoreXTenant(request);
  const body = await request.json();

  const response = postProducts({
    products,
    xTenant,
    body,
  });

  return response;
}

export async function PUT(request) {
  await connectToDatabase();
  const xTenant = getStoreXTenant(request);
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const body = await request.json();

  const response = await putProducts({
    products,
    xTenant,
    body,
    id,
  });

  return response;
}

export async function DELETE(request) {
  await connectToDatabase();
  const xTenant = getStoreXTenant(request);
  const body = await request.json();

  const response = await deleteProdutcs({
    products,
    xTenant,
    body,
  });

  return response;
}
