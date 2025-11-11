import { connectToDatabase } from "../lib/dbConnect";
import { users } from "../user/usersModel.js";
import { postLogin } from "./controller.js";

export async function POST(request) {
  await connectToDatabase();
  const body = await request.json();
  const { email, password } = body;
  const userAgent = request.headers.get('user-agent');

  const response = postLogin({ users, email, password, userAgent });

  return response;
}
