import { serialize } from "cookie";
import crypto, { randomUUID } from "crypto";
import { tenants } from "../login/create/tenantModel";

const SECRET = process.env.COOKIE_SECRET;

function generateSignature(value) {
  return crypto.createHmac("sha256", SECRET).update(value).digest("hex");
}

export function createCookie(tenantId, userId, position) {
  // adiciona timestamp ou nonce para tornar o cookie único
  const timestamp = Date.now();
  const nonce = randomUUID(); // ou só o timestamp já dá

  const data = [tenantId, userId, position, timestamp, nonce].join(".");
  const signature = generateSignature(data);

  const cookieValue = `${tenantId}.${userId}.${position}.${timestamp}.${nonce}.${signature}`;

  return serialize("x-tenant", cookieValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 16 * 60 * 60, // 16 hrs
  });
}

export const postLogin = async (connectToDatabase, users, email, password) => {
  try {
    await connectToDatabase();

    const user = await users
      .findOne({ email, active: true })
      .populate({ path: "tenant", model: tenants, select: "name" });

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

    return new Response(JSON.stringify({ message: "Login bem-sucedido" }), {
      status: 200,
      headers: {
        "Set-Cookie": createCookie(user.tenant._id, user._id, user.position),
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Erro no login" }), {
      status: 500,
    });
  }
};
