import mongoose from "mongoose";

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
  categories,
  commands,
  products,
  xTenant,
  _id,
}) => {
  try {
    let response;
    if (_id) {
      response = await commands
        .findOne({
          _id,
          tenant: xTenant.id,
        })
        .populate(populate(products, categories))
        .lean();
    } else {
      response = await commands
        .find({
          tenant: xTenant.id,
        })
        .populate(populate(products, categories))
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

export const postCommands = async ({
  categories,
  commands,
  products,
  xTenant,
  body,
}) => {
  try {
    body.tenant = xTenant.id;
    body.subOrders = body.subOrders
      .filter((item) => item.quantity > 0 && item.product)
      .map((item) => ({
        product: item.product,
        quantity: item.quantity,
        userId: xTenant.userId,
      }));

    const created = await commands.create(body);
    await created.populate(populate(products, categories));

    return Response.json({ records: created }, { status: 200 });
  } catch (err) {
    return Response.json(
      { message: "Ocorreu um erro ao fazer o cadastro do item" },
      { status: 500 }
    );
  }
};

export const putCommands = async ({
  categories,
  commands,
  products,
  xTenant,
  body,
  _id,
}) => {
  try {
    const validSubOrders = (body.subOrders || [])
      .filter((item) => item.product && item.quantity > 0)
      .map((item) => ({
        product: item.product,
        quantity: item.quantity,
        userId: xTenant.userId,
      }));

    const response = await commands
      .findOneAndUpdate(
        { _id, tenant: xTenant.id },
        {
          $push: { subOrders: { $each: validSubOrders } },
          $set: { "payment.amount": body.payment?.amount },
        },
        { new: true }
      )
      .populate(populate(products, categories));

    if (!response) {
      return Response.json(
        { message: "Comanda não encontrada" },
        { status: 404 }
      );
    }

    return Response.json({ records: response }, { status: 200 });
  } catch (err) {
    return Response.json(
      { message: "Ocorreu um erro ao atualizar o item" },
      { status: 500 }
    );
  }
};

export const getCommandsForUser = async ({ commands, xTenant }) => {
  try {
    let response;

    if (xTenant.userId) {
      response = await commands.aggregate([
        { $match: { tenant: new mongoose.Types.ObjectId(xTenant.id) } },
        { $unwind: "$subOrders" },
        { $match: { "subOrders.userId": xTenant.userId } },
        {
          $lookup: {
            from: "products", // nome da collection no MongoDB
            localField: "subOrders.product",
            foreignField: "_id",
            as: "productDetails",
          },
        },
        {
          $project: {
            _id: 0,
            product: { $arrayElemAt: ["$productDetails", 0] },
            quantity: "$subOrders.quantity",
          },
        },
      ]);
    }

    if (!response || response.length === 0) {
      return Response.json(
        { message: "Nenhum item encontrado" },
        { status: 404 }
      );
    }

    return Response.json({ records: response }, { status: 200 });
  } catch (_) {
    return Response.json(
      { message: "Erro ao processar os itens" },
      { status: 500 }
    );
  }
};
