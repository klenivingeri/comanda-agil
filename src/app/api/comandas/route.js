import { getStoreXTenant } from "../utils/getStoreXTenant.js";
import { getComandas } from "./controller.js";

export async function GET(request) {
  const xTenant = getStoreXTenant(request);

  const response = getComandas(request, xTenant);
  return response;
}
