import { serialize } from "cookie";
import crypto from "crypto";

// Segredo para assinatura do cookie
const SECRET = process.env.COOKIE_SECRET || "uma_senha_muito_forte";

// Função para assinar o valor
function sign(value) {
  return crypto.createHmac("sha256", SECRET).update(value).digest("hex");
}

export const postLogin = async (request) => {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Aqui você validaria o usuário no DB
    // Exemplo: usuário fixo para teste
    const user = {
      email: "erick@loja.com",
      passwordHash: "$2b$05$FqK2qH8m7t92pSgXy5m2jOn",
      tenantId: "loja123",
    };

    // Para teste, vamos ignorar validação de senha
    // if (email !== user.email) {
    //   return Response.json(
    //     { message: "Credenciais inválidas" },
    //     { status: 401 }
    //   );
    // }

    // Criando cookie x-tenant assinado
    const signature = sign(user.tenantId);
    const cookieValue = `${user.tenantId}.${signature}`;

    return new Response(JSON.stringify({ message: "Login bem-sucedido" }), {
      status: 200,
      headers: {
        "Set-Cookie": serialize("x-tenant", cookieValue, {
          httpOnly: true, // impede acesso via JS
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
          //maxAge: 60 * 60 * 24, // 1 dia
        }),
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Erro no login" }, { status: 500 });
  }
};
