import mongoose from "mongoose";
import { getInfoPainelUser } from "./business";
import { isEmpty } from "src/app/utils/empty";

const populate = (products, categories, users) => [
  {
    path: "subOrders.product",
    model: products,
    populate: {
      path: "category",
      model: categories,
      select: "name type",
    },
  },
  {
    path: "subOrders.userId",
    model: users,
    select: "name image",
  },
];

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

  // console.log(`🗓️ Dia ${daysAgo} atrás`);
  // console.log("Início BRT:", startBRT.toLocaleString("pt-BR"));
  // console.log("Fim BRT:", endBRT.toLocaleString("pt-BR"));
  // console.log("Início UTC:", startUTC.toISOString());
  // console.log("Fim UTC:", endUTC.toISOString());

  return { startUTC, endUTC };
};

export const getCommands = async ({
  categories,
  commands,
  products,
  users,
  xTenant,
  code,
  _id,
}) => {
  try {
    let response;

    if (_id) {
      response = await commands
        .findOne({
          tenant: xTenant.id,
          _id
        })
        .populate(populate(products, categories, users))
        .lean();
    } else {
      const status = {"payment.status.id": "PENDING"} //  { $ne: 'PENDING'} não igual a PENDING
      const search = code ? { code, ...status} : status
      response = await commands
        .find({
          tenant: xTenant.id,
          ...search 
        })
        .populate(populate(products, categories, users))
        .lean();
    }

    if (!isEmpty(response)) {
      return Response.json(
        { 
          success: true,
          records: Array.isArray(response) ? response : [response] 
        }, 
        { status: 200 }
      );
    }

    return Response.json(
      { 
        success: false,
        message: "Nenhuma comanda encontrada",
        records: [],
      },
      { status: 404 }
    );
  } catch {
    return Response.json(
      { 
        success: false,
        message: "Erro ao processar os itens",
        records: []
      },
      { status: 500 }
    );
  }
};

export const postCommands = async ({
  categories,
  commands,
  products,
  xTenant,
  users,
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
    await created.populate(populate(products, categories, users));

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
  users,
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
      .populate(populate(products, categories, users));

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
  users,
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
        .populate(populate(products, categories, users));
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
        .populate(populate(products, categories, users));
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

export const putCloseCommands = async ({
  commands,
  xTenant,
  paymentMethod, // O novo método (ex: "PIX", "CARD")
  statusId, // O novo status (ex: "PAID", "CANCELLED")
  _id,
}) => {
  try {
    const updateFields = {};

    if (paymentMethod) {
      updateFields["payment.method"] = paymentMethod;
    }

    if (statusId) {
      updateFields["payment.status.id"] = statusId;
    }

    // Verificação de segurança para garantir que haja algo para atualizar
    if (Object.keys(updateFields).length === 0) {
      return Response.json(
        { message: "Nenhum campo de pagamento fornecido para atualização" },
        { status: 400 } // Requisição inválida
      );
    }
    const response = await commands.findOneAndUpdate(
      { _id, tenant: xTenant.id },
      { $set: updateFields },
      { new: true }
    );

    if (!response) {
      return Response.json(
        { message: "Comanda não encontrada ou pertence a outro inquilino" },
        { status: 404 }
      );
    }

    return Response.json({ records: response }, { status: 200 });
  } catch (err) {
    console.error(err);
    return Response.json(
      { message: "Ocorreu um erro ao atualizar o status de pagamento" },
      { status: 500 }
    );
  }
};
