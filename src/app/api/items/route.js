import { getProducts, postProducts } from "./controller.js";

export async function GET(request) {
  const response = getProducts(request);
  return response;
}

export async function POST(request) {
  const response = postProducts(request);
  return response;
}
