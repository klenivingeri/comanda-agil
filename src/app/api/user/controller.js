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

export const getUser = async ({ users, xTenant, _id }) => {
  try {
    let response;

    if (xTenant.role === "admin") {
      if (_id) {
        response = await users
          .findOne({
            _id,
            tenant: xTenant.id,
          })
          .lean();
      } else {
        response = await users
          .find({
            tenant: xTenant.id,
          })
          .lean();
      }
    } else {
      const user = await users
        .findOne({
          _id: xTenant.userId,
          tenant: xTenant.id,
        })
        .lean();
      delete user.password;
      response = user;
    }

    if (response && (Array.isArray(response) ? response.length > 0 : true)) {
      return Response.json({ records: response }, { status: 200 });
    }

    return Response.json(
      { message: "Nenhum funcionario encontrado" },
      { status: 404 }
    );
  } catch (_) {
    return Response.json(
      { message: "Erro ao buscar funcionario" },
      { status: 500 }
    );
  }
};

export const postUser = async ({ users, xTenant, body }) => {
  try {
    body.tenant = xTenant.id;
    //createUser("erick@loja.com", "123456");
    const created = await users.create(body);
    return Response.json(
      { message: "sucesso ao fazer login" },
      { status: 200 }
    );
  } catch (_) {
    return Response.json({ message: "Rotas de items" }, { status: 500 });
  }
};

export const putUser = async ({ users, xTenant, _id, body }) => {
  try {
    body.tenant = xTenant.id;

    await users.findByIdAndUpdate({ _id, tenant: xTenant.id }, { $set: body });
    return Response.json(
      { message: "sucesso ao fazer login" },
      { status: 200 }
    );
  } catch (_) {
    return Response.json({ message: "Rotas de items" }, { status: 500 });
  }
};
