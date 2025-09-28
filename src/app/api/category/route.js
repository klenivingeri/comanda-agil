import { getTypeItens } from "./controller.js";

export async function GET(request) {
  const response = getTypeItens(request);
  return response;
}
