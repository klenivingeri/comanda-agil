import { connectToDatabase } from "../lib/dbConnect";
import { users } from "./usersModel.js";
import { postUser, getUser, putUser } from "./controller.js";
import { getStoreXTenant } from "../utils/getStoreXTenant";

export async function GET(request) {
  await connectToDatabase();
  const xTenant = getStoreXTenant(request);
  const { searchParams } = new URL(request.url);
  const _id = searchParams.get("_id");

  const response = await getUser({ users, xTenant, _id });

  return response;
}

export async function POST(request) {
  await connectToDatabase();
  const xTenant = getStoreXTenant(request);
  const body = await request.json();
  const response = postUser({ users, xTenant, body });
  return response;
}

export async function PUT(request) {
  await connectToDatabase();
  const xTenant = getStoreXTenant(request);
  const { searchParams } = new URL(request.url);
  const _id = searchParams.get("_id");
  const body = await request.json();
  const userAgent = request.headers.get('user-agent');

  const response = putUser({ users, xTenant, _id, body, userAgent });
  return response;
}