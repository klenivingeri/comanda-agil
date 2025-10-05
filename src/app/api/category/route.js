import { connectToDatabase } from "../lib/dbConnect";
import { categories } from "./categoryModel";

import { getStoreXTenant } from "../utils/getStoreXTenant.js";
import {
  getCagetories,
  postCagetories,
  putCagetories,
  deleteCagetories,
} from "./controller.js";

export async function GET(request) {
  await connectToDatabase();
  const xTenant = getStoreXTenant(request);
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const response = await getCagetories({
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

  const response = await postCagetories({
    categories,
    xTenant,
    body,
  });

  return response;
}

export async function PUT(request) {
  await connectToDatabase();
  const xTenant = getStoreXTenant(request);
  const body = await request.json();

  const response = await putCagetories({
    categories,
    xTenant,
    body,
  });

  return response;
}

export async function DELETE(request) {
  await connectToDatabase();
  const xTenant = getStoreXTenant(request);
  const body = await request.json();

  const response = await deleteCagetories({
    categories,
    xTenant,
    body,
  });

  return response;
}
