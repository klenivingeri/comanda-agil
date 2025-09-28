import mongoose from "mongoose";

import { users } from "../login/usersModel";

const createType = (_str) => {
  let str = _str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase();

  return str;
};

export const getCagetories = async ({
  connectToDatabase,
  category,
  xTenant,
  id,
}) => {
  try {
    await connectToDatabase();
    let response;

    if (id) {
      response = await category
        .findOne({
          _id: new mongoose.Types.ObjectId(id),
          tenant: new mongoose.Types.ObjectId(xTenant.id),
        })
        .populate("tenant");
    } else {
      response = await category
        .find({
          tenant: new mongoose.Types.ObjectId(xTenant.id), // filtra todos pelo tenant
        })
        .populate("tenant");
    }

    if (response && (Array.isArray(response) ? response.length > 0 : true)) {
      return Response.json({ records: response }, { status: 200 });
    }

    return Response.json(
      { message: "Nenhum item encontrado" },
      { status: 404 }
    );
  } catch (e) {
    console.error(e);
    return Response.json(
      { message: "Erro ao processar os itens" },
      { status: 500 }
    );
  }
};

export const postCagetories = async ({
  connectToDatabase,
  category,
  xTenant,
  body,
}) => {
  try {
    await connectToDatabase();
    const { name } = body;
    const type = createType(name);
    const payload = {
      name,
      type,
      tenant: new mongoose.Types.ObjectId(xTenant.id),
    };

    await category.create(payload);

    return Response.json({ message: "Sucesso" }, { status: 200 });
  } catch (_) {
    return Response.json(
      { message: "Ocorreu um erro ao Fazer o cadastro do item" },
      { status: 500 }
    );
  }
};

export const patchCagetories = async ({
  connectToDatabase,
  category,
  xTenant,
  body,
}) => {
  try {
    await connectToDatabase();
    const { name, _id } = body;
    const type = createType(name);
    const payload = {
      name,
      type,
    };

    await category.findByIdAndUpdate(_id, { $set: payload });

    return Response.json({ message: "Sucesso" }, { status: 200 });
  } catch (_) {
    return Response.json(
      { message: "Ocorreu um erro ao Fazer o cadastro do item" },
      { status: 500 }
    );
  }
};

export const deleteCagetories = async ({
  connectToDatabase,
  category,
  xTenant,
  body,
}) => {
  try {
    await connectToDatabase();
    const { _id } = body;

    const result = await category.findOneAndDelete({ _id });

    return Response.json({ message: "Sucesso" }, { status: 200 });
  } catch (_) {
    return Response.json(
      { message: "Ocorreu um erro ao Fazer o cadastro do item" },
      { status: 500 }
    );
  }
};
deleteCagetories;
