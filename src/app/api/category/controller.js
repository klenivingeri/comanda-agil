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
  categories,
  xTenant,
  id,
}) => {
  try {
    await connectToDatabase();
    let response;

    if (id) {
      response = await categories.findOne({
        _id: id,
        tenant: xTenant.id,
      });
    } else {
      response = await categories.find({
        tenant: xTenant.id,
      });
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
  categories,
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
      tenant: xTenant.id,
    };

    await categories.create(payload);

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
  categories,
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

    await categories.findByIdAndUpdate(
      { _id, tenant: xTenant.id },
      { $set: payload }
    );

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
  categories,
  xTenant,
  body,
}) => {
  try {
    await connectToDatabase();
    const { _id } = body;

    const result = await categories.findOneAndDelete({
      _id,
      tenant: xTenant.id,
    });

    return Response.json({ message: "Sucesso" }, { status: 200 });
  } catch (_) {
    return Response.json(
      { message: "Ocorreu um erro ao Fazer o cadastro do item" },
      { status: 500 }
    );
  }
};
