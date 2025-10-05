export const getProducts = async ({ products, categories, xTenant, id }) => {
  try {
    let response;
    const populate = {
      path: "category",
      model: categories,
      select: "name type",
    };
    if (id) {
      response = await products
        .findOne({
          _id: id,
          tenant: xTenant.id,
        })
        .populate(populate)
        .lean();
    } else {
      response = await products
        .find({
          tenant: xTenant.id,
        })
        .populate(populate)
        .lean();
    }

    if (response && (Array.isArray(response) ? response.length > 0 : true)) {
      return Response.json({ records: response }, { status: 200 });
    }

    return Response.json(
      { message: "Nenhum item encontrado" },
      { status: 404 }
    );
  } catch {
    return Response.json(
      { message: "Erro ao processar os itens" },
      { status: 500 }
    );
  }
};

export const postProducts = async ({ products, xTenant, body }) => {
  try {
    body.tenant = xTenant.id;
    await products.create(body);

    return Response.json({ message: "Sucesso" }, { status: 200 });
  } catch (_) {
    return Response.json(
      { message: "Ocorreu um erro ao Fazer o cadastro do item" },
      { status: 500 }
    );
  }
};

export const putProducts = async ({ products, xTenant, body, id }) => {
  try {
    await products.findByIdAndUpdate(
      { _id: id, tenant: xTenant.id },
      { $set: body }
    );

    return Response.json({ message: "Sucesso" }, { status: 200 });
  } catch (_) {
    return Response.json(
      { message: "Ocorreu um erro ao Fazer o cadastro do item" },
      { status: 500 }
    );
  }
};

export const deleteProdutcs = async ({ products, xTenant, body }) => {
  try {
    const { _id } = body;

    const result = await products.findOneAndDelete({
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
