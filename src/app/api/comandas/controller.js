const populate = (products, categories) => ({
  path: "subOrders.product",
  model: products,
  populate: {
    path: "category",
    model: categories,
    select: "name type",
  },
});

export const getCommands = async ({
  connectToDatabase,
  categories,
  commands,
  products,
  xTenant,
  _id,
}) => {
  try {
    await connectToDatabase();
    let response;
    if (_id) {
      response = await commands
        .findOne({
          _id,
          tenant: xTenant.id,
        })
        .populate(populate(products, categories));
    } else {
      response = await commands
        .find({
          tenant: xTenant.id,
        })
        .populate(populate(products, categories));
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

export const postCommands = async ({
  connectToDatabase,
  categories,
  commands,
  products,
  xTenant,
  body,
}) => {
  try {
    body.tenant = xTenant.id;

    await connectToDatabase();

    const created = await commands.create(body);
    const response = await commands
      .findById(created._id)
      .populate(populate(products, categories));

    return Response.json({ records: response }, { status: 200 });
  } catch (err) {
    return Response.json(
      { message: "Ocorreu um erro ao fazer o cadastro do item" },
      { status: 500 }
    );
  }
};

export const putCommands = async ({
  connectToDatabase,
  categories,
  commands,
  products,
  xTenant,
  body,
  _id,
}) => {
  try {
    await connectToDatabase();
    const response = await commands
      .findOneAndUpdate(
        { _id, tenant: xTenant.id },
        {
          $push: {
            subOrders: {
              $each: body.subOrders.map((item) => ({
                product: item.product,
                quantity: item.quantity,
              })),
            },
          },
          $set: { "payment.amount": body.payment.amount },
        },
        { new: true }
      )
      .populate(populate(products, categories));

    return Response.json({ records: response }, { status: 200 });
  } catch (_) {
    return Response.json(
      { message: "Ocorreu um erro ao Fazer o cadastro do item" },
      { status: 500 }
    );
  }
};
