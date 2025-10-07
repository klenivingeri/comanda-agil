import { getMenu } from "./controller.js";
import { getStoreXTenant } from "../utils/getStoreXTenant.js";

export async function GET(request) {
  const xTenant = getStoreXTenant(request);
  const response = getMenu({ xTenant });
  return response;
}
