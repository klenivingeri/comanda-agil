import { serialize } from "cookie";
import crypto, { randomUUID } from "crypto";
import { tenants } from "../user/tenantModel";
import { isEmpty } from "src/app/utils/empty";

const SECRET = process.env.COOKIE_SECRET;

function generateSignature(value) {
  return crypto.createHmac("sha256", SECRET).update(value).digest("hex");
}

export function createCookie(tenantId, userId, rule) {
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

export const removeTenantCookie = () => {
  return serialize("x-tenant", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0, // <--- ESTE É O SEGREDO
  });
};

export const postLogin = async ({ users, email, password, userAgent }) => {
  try {
    const user = await users
      .findOne({ email, active: true })
      .select("+password")
      .populate({ path: "tenant", model: tenants, select: "name" })
      .lean();

    const match = user?.password === password;
    if (!match)
      return new Response(
        JSON.stringify({ message: "Credenciais inválidas" }),
        { status: 401 }
      );

    const matchUserAgent = isEmpty(user?.userAgent) || user?.userAgent?.includes(userAgent);
    if (!matchUserAgent)
      return new Response(
        JSON.stringify({
          success: false,
          message: "Dispositivo não autorizado",
        }),
        { status: 401 }
      );

    return new Response(
      JSON.stringify({
        success: true,
        message: "Login bem-sucedido",
        records: [
          {
            name: user.name,
            role: user.role,
          },
        ],
      }),
      {
        status: 200,
        headers: {
          "Set-Cookie": createCookie(user.tenant._id, user._id, user.role),
          "Content-Type": "application/json",
        },
      }
    );
  } catch (_) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Algo errado não esta certo, tente novamente.",
      }),
      {
        status: 500,
      }
    );
  }
};

export const getLogout = async () => {
  const cookieHeader = removeTenantCookie();
  return new Response(
    JSON.stringify({
      success: true,
      message: "Logout bem-sucedido",
    }),
    {
      status: 200,
      headers: {
        "Set-Cookie": cookieHeader,
      },
    }
  );
};
