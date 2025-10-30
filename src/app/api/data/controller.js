import mongoose from "mongoose";
import { getPeriod } from "src/app/utils/period";

export const getData = async ({
  categories,
  commands,
  products,
  users,
  xTenant,
  period,
}) => {

  if (!xTenant?.isValid) {
    return Response.json(
      { 
        success: false,
        message: "Tenant ID inválido ou não autorizado"
      },
      { status: 403 }
    );
  }

  const { start, end } = getPeriod(period);
  try {
    const tenantObjectId = new mongoose.Types.ObjectId(xTenant.id);

    const categoriesPromise = categories
      .find({ tenant: tenantObjectId })
      .lean();

    const productsPromise = products.find({ tenant: tenantObjectId }).lean();

    const commandsPromise = commands
      .find({
        tenant: tenantObjectId,
        createdAt: { $gte: start, $lte: end },
      })
      .select({
        code: 1,
        userId: 1,
        payment: 1,
        createdAt: 1,
        "subOrders.product": 1,
        "subOrders.quantity": 1,
        "subOrders.createdAt": 1,
      })
      .lean();

    const usersPromise = users.find({ tenant: tenantObjectId }).lean();

    const [categoriesData, productsData, commandsData, usersData] =
      await Promise.all([
        categoriesPromise,
        productsPromise,
        commandsPromise,
        usersPromise,
      ]);

    if (commandsData.length > 0) {
      return Response.json(
        {
          success: true,
          orders: commandsData,
          catalog_products: productsData,
          catalog_categories: categoriesData,
          catalog_users: usersData,
        },
        { status: 200 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Nenhuma comanda encontrada no período. Catálogos carregados.",
        orders: [],
        catalog_products: productsData,
        catalog_categories: categoriesData,
        catalog_users: usersData,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Erro ao processar os itens: falha na busca do banco de dados.",
      },
      { status: 500 }
    );
  }
};
