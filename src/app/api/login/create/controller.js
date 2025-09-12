import { esperar } from "../utils/esperar";
import bcrypt from "bcrypt";

const saltRounds = 5;

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = {
    email,
    passwordHash,
    tenantId: "loja123", // exemplo de tenant
  };

  // Aqui você salvaria no banco
  console.log("Usuário criado:", user);
  return user;
}

export const postLogin = async (request) => {
  try {
    esperar(3000);
    createUser("erick@loja.com", "123456");
    return Response.json(
      { message: "sucesso ao fazer login" },
      { status: 200 }
    );
  } catch {
    return Response.json({ message: "Rotas de items" }, { status: 500 });
  }
};
