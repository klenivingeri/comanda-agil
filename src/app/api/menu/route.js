import { getMenu } from "./controller.js";

export async function GET(request) {
  const response = getMenu(request);
  return response;
}
