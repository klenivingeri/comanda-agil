import mongoose from "mongoose";
import { getInfoPainelUser } from "./business";

const populate = (products, categories) => ({
  path: "subOrders.product",
  model: products,
  populate: {
    path: "category",
    model: categories,
    select: "name type",
  },
});

const getDayRangeBRT = (daysAgo = 0) => {
  const now = new Date();

  // 🧮 Calcula a data alvo (no horário local)
  const target = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - daysAgo
  );

  // Início e fim do dia em BRT (UTC−3)
  const startBRT = new Date(target.setHours(0, 0, 0, 0));
  const endBRT = new Date(target.setHours(23, 59, 59, 999));

  // Converte BRT → UTC (somando 3 horas)
  const startUTC = new Date(startBRT.getTime() + 3 * 60 * 60 * 1000);
  const endUTC = new Date(endBRT.getTime() + 3 * 60 * 60 * 1000);

  console.log(`🗓️ Dia ${daysAgo} atrás`);
  console.log("Início BRT:", startBRT.toLocaleString("pt-BR"));
  console.log("Fim BRT:", endBRT.toLocaleString("pt-BR"));
  console.log("Início UTC:", startUTC.toISOString());
  console.log("Fim UTC:", endUTC.toISOString());

  return { startUTC, endUTC };
};

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
          tenant: xTenant.id,
          _id,
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
    body.userId = xTenant.userId;
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

export const deleteCommands = async ({
  categories,
  commands,
  products,
  xTenant,
  restValue = 0,
  _id,
  itemUUID,
}) => {
  try {
    if (!itemUUID) {
      return Response.json(
        { message: "ID do item a ser removido não fornecido" },
        { status: 400 }
      );
    }
    let response;
    if (!restValue) {
      response = await commands
        .findOneAndUpdate(
          { _id, tenant: xTenant.id },
          {
            $pull: {
              subOrders: {
                _id: new mongoose.Types.ObjectId(itemUUID),
              },
            },
          },
          { new: true }
        )
        .populate(populate(products, categories));
    } else {
      response = await commands
        .findOneAndUpdate(
          {
            _id,
            tenant: xTenant.id,
            "subOrders._id": new mongoose.Types.ObjectId(itemUUID),
          },
          {
            $set: {
              "subOrders.$[subItem].quantity": restValue,
            },
          },
          {
            new: true,
            arrayFilters: [
              {
                "subItem._id": new mongoose.Types.ObjectId(itemUUID),
              },
            ],
          }
        )
        .populate(populate(products, categories));
    }

    if (!response) {
      return Response.json(
        { message: "Comanda não encontrada" },
        { status: 404 }
      );
    }

    return Response.json({ records: response }, { status: 200 });
  } catch (err) {
    console.error(err);
    return Response.json(
      { message: "Ocorreu um erro ao deletar o item da comanda" },
      { status: 500 }
    );
  }
};

export const getCommandsForUser = async ({
  dailySalesReport,
  commands,
  xTenant,
}) => {
  try {
    let response;
    let statisticas;
    const { startUTC, endUTC } = getDayRangeBRT(1);
    if (xTenant.isValid) {
      statisticas = await dailySalesReport
        .findOne({
          tenant: new mongoose.Types.ObjectId(xTenant.id),
          userId: new mongoose.Types.ObjectId(xTenant.userId),
        })
        .lean();
      const allCommandItemsByUserUuid = await commands.aggregate([
        {
          $match: {
            tenant: new mongoose.Types.ObjectId(xTenant.id),
            createdAt: { $gte: startUTC, $lte: endUTC },
          },
        },
        { $unwind: "$subOrders" },
        { $match: { "subOrders.userId": xTenant.userId } },
        {
          $lookup: {
            from: "products",
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

      const totalCommandByUserUuid = await commands.countDocuments({
        userId: xTenant.userId,
        tenant: xTenant.id,
        createdAt: { $gte: startUTC, $lte: endUTC },
      });

      statisticas = getInfoPainelUser(
        allCommandItemsByUserUuid,
        totalCommandByUserUuid
      );

      if (!statisticas) {
        statisticas.userId = xTenant.userId;
        statisticas.tenant = xTenant.id;
      }

      response = statisticas;
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
