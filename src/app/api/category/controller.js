const createType = (_str) => {
  let str = _str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase();

  return str;
};

export const getCagetories = async ({ categories, xTenant, id }) => {
  try {
    let response;

    if (id) {
      response = await categories
        .findOne({
          _id: id,
          tenant: xTenant.id,
        })
        .lean();
    } else {
      response = await categories
        .find({
          tenant: xTenant.id,
        })
        .lean();
    }

    if (response && (Array.isArray(response) ? response.length > 0 : true)) {
      return Response.json({ records: response }, { status: 200 });
    }

    return Response.json(
      { message: "Nenhum item encontrado" },
      { status: 404 }
    );
  } catch (_) {
    return Response.json(
      { message: "Erro ao processar os itens" },
      { status: 500 }
    );
  }
};

export const postCagetories = async ({ categories, xTenant, body }) => {
  try {
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

export const putCagetories = async ({ categories, xTenant, body }) => {
  try {
    const { name, _id, enable } = body;
    const type = createType(name);
    const payload = {
      name,
      type,
      enable,
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

export const deleteCagetories = async ({ categories, xTenant, body }) => {
  try {
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
