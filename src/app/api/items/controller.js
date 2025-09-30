export const getProducts = async ({
  connectToDatabase,
  products,
  categories,
  xTenant,
  id,
}) => {
  try {
    await connectToDatabase();
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
        .populate(populate);
    } else {
      response = await products
        .find({
          tenant: xTenant.id,
        })
        .populate(populate);
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

export const postProducts = async ({
  connectToDatabase,
  products,
  xTenant,
  body,
}) => {
  try {
    body.tenant = xTenant.id;
    await connectToDatabase();
    await products.create(body);

    return Response.json({ message: "Sucesso" }, { status: 200 });
  } catch (_) {
    return Response.json(
      { message: "Ocorreu um erro ao Fazer o cadastro do item" },
      { status: 500 }
    );
  }
};

export const putProducts = async ({
  connectToDatabase,
  products,
  xTenant,
  body,
  id,
}) => {
  try {
    await connectToDatabase();

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

export const deleteProdutcs = async ({
  connectToDatabase,
  products,
  xTenant,
  body,
}) => {
  try {
    await connectToDatabase();
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
