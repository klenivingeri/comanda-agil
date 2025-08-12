import { getProducts } from "./controller.js";

export async function GET(request) {
  const response = getProducts(request);
  return response;
}
