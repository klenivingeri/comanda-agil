import { connectToDatabase } from "../lib/dbConnect";
import { product } from "./productModel";
import { getProducts, postProducts } from "./controller.js";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const response = getProducts(connectToDatabase, product, id);

  return response;
}

export async function POST(request) {
  const body = await request.json();

  const response = postProducts(connectToDatabase, product, body);

  return response;
}
