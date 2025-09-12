import { getStoreXTenant } from "../utils/getStoreXTenant.js";
import { getComandas } from "./controller.js";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const xTenant = getStoreXTenant(request);

  const response = getComandas(id, xTenant);
  return response;
}
