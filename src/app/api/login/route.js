import { postLogin } from "./controller.js";

export async function POST(request) {
  const response = postLogin(request);
  return response;
}
