import { parse } from "cookie";
import crypto from "crypto";

const SECRET = process.env.COOKIE_SECRET;

function sign(value) {
  return crypto.createHmac("sha256", SECRET).update(value).digest("hex");
}

export const getStoreXTenant = (request) => {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = parse(cookieHeader);
  let xTenant = { status: 200, message: "Valido" };

  const cookieValue = cookies["x-tenant"];

  if (!cookieValue) {
    xTenant.status = 401;
    xTenant.message = "x-tenant não encontrado";
    return xTenant;
  }

  const [tenantId, userId, role, timestamp, nonce, signature] =
    cookieValue.split(".");
  if (
    sign(`${tenantId}.${userId}.${role}.${timestamp}.${nonce}`) !== signature
  ) {
    xTenant.status = 401;
    xTenant.message = "x-tenant invalido";
    return xTenant;
  }

  xTenant.id = tenantId;
  xTenant.userId = userId;
  xTenant.role = role;

  return xTenant;
};
