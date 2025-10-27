import { serialize } from "cookie";
import crypto, { randomUUID } from "crypto";
import { tenants } from "../user/tenantModel";

const SECRET = process.env.COOKIE_SECRET;

function generateSignature(value) {
  return crypto.createHmac("sha256", SECRET).update(value).digest("hex");
}

export function createCookie(tenantId, userId, rule) {
  // adiciona timestamp ou nonce para tornar o cookie único
  const timestamp = Date.now();
  const nonce = randomUUID(); // ou só o timestamp já dá

  const data = [tenantId, userId, rule, timestamp, nonce].join(".");
  const signature = generateSignature(data);

  const cookieValue = `${tenantId}.${userId}.${rule}.${timestamp}.${nonce}.${signature}`;

  return serialize("x-tenant", cookieValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 16 * 60 * 60, // 16 hrs
  });
}

export const postLogin = async ({ users, email, password }) => {
  try {
    const user = await users
      .findOne({ email, active: true })
      .populate({ path: "tenant", model: tenants, select: "name" })
      .lean();

    if (!user)
      return new Response(
        JSON.stringify({ message: "Credenciais inválidas" }),
        { status: 401 }
      );

    const match = user.password === password;
    if (!match)
      return new Response(
        JSON.stringify({ message: "Credenciais inválidas" }),
        { status: 401 }
      );

    return new Response(JSON.stringify({ 
        message: "Login bem-sucedido",
        email
      }), {
      status: 200,
      headers: {
        "Set-Cookie": createCookie(user.tenant._id, user._id, user.role),
        "Content-Type": "application/json",
      },
    });
  } catch (_) {
    return new Response(JSON.stringify({ message: "Erro no login" }), {
      status: 500,
    });
  }
};
