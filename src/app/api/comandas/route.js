import { getComandas } from "./controller.js";

export async function GET(request) {
  const response = getComandas(request);
  return response;
}
