import { connectToDatabase } from "../lib/dbConnect";
import { categories } from "./categoryModel";

import { getStoreXTenant } from "../utils/getStoreXTenant.js";
import {
  getCagetories,
  postCagetories,
  patchCagetories,
  deleteCagetories,
} from "./controller.js";

export async function GET(request) {
  const xTenant = getStoreXTenant(request);
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const response = await getCagetories({
    connectToDatabase,
    categories,
    xTenant,
    id,
  });

  return response;
}

export async function POST(request) {
  const xTenant = getStoreXTenant(request);
  const body = await request.json();

  const response = await postCagetories({
    connectToDatabase,
    categories,
    xTenant,
    body,
  });

  return response;
}

export async function PATCH(request) {
  const xTenant = getStoreXTenant(request);
  const body = await request.json();

  const response = await patchCagetories({
    connectToDatabase,
    categories,
    xTenant,
    body,
  });

  return response;
}

export async function DELETE(request) {
  const xTenant = getStoreXTenant(request);
  const body = await request.json();

  const response = await deleteCagetories({
    connectToDatabase,
    categories,
    xTenant,
    body,
  });

  return response;
}
