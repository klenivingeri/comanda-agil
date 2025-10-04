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

  return user;
}

export const postUser = async ({ connectToDatabase, users, xTenant, body }) => {
  try {
    connectToDatabase();
    esperar(3000);
    console.log(body);
    body.tenant = xTenant.id;
    //createUser("erick@loja.com", "123456");
    const created = await users.create(body);
    return Response.json(
      { message: "sucesso ao fazer login" },
      { status: 200 }
    );
  } catch (_) {
    console.log(_);
    return Response.json({ message: "Rotas de items" }, { status: 500 });
  }
};
