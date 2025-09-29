import { categories } from "../category/categoryModel";

export const getProducts = async ({
  connectToDatabase,
  product,
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
      response = await product
        .findOne({
          _id: id,
          tenant: xTenant.id,
        })
        .populate(populate);
    } else {
      response = await product
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
  product,
  xTenant,
  body,
}) => {
  try {
    body.tenant = xTenant.id;
    await connectToDatabase();
    await product.create(body);

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
  product,
  xTenant,
  body,
  id,
}) => {
  try {
    await connectToDatabase();

    await product.findByIdAndUpdate(
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
  product,
  xTenant,
  body,
}) => {
  try {
    await connectToDatabase();
    const { _id } = body;

    const result = await product.findOneAndDelete({
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
