import { getPeriod } from "src/app/utils/period";
import { aggregateCategories, aggregateProducts } from "./aggregations";

const periodos = {
  day: getPeriod("day"),
  week: getPeriod("week"),
  month: getPeriod("month"),
};

const populate = (products, categories) => [
  {
    path: "subOrders.product",
    model: products,
    populate: {
      path: "category",
      model: categories,
      select: "name type",
    },
  },
];

export const reportCategories = async ({ commands, xTenant, period }) => {
  try {

    const periodo = {
      ...periodos[period],
    };

    const response = await commands.aggregate(
      aggregateCategories({ xTenant, periodo })
    );

    if (response && (Array.isArray(response) ? response.length > 0 : true)) {
      return Response.json(
        {
          success: true,
          records: response,
        },
        { status: 200 }
      );
    }

    return Response.json(
      {
        success: false,
        message: "Nenhum item encontrado",
      },
      { status: 200 }
    );
  } catch (_) {
    return Response.json(
      {
        success: false,
        message: "Erro ao processar os itens",
      },
      { status: 500 }
    );
  }
};

export const reportProducts = async ({ commands, xTenant, period }) => {
  try {

    const periodo = {
      ...periodos[period],
    };
    console.log(periodo)
    const response = await commands.aggregate(
      aggregateProducts({ xTenant, periodo })
    );

    if (response && (Array.isArray(response) ? response.length > 0 : true)) {
      const serialize = response.map((item) => ({
          _id: item.product._id,
          name: item.product.name,
          price: item.product.price,
          category: item.product.category,
          totalQuantity: item.quantity,
        }));


      return Response.json(
        {
          success: true,
          records: serialize,
        },
        { status: 200 }
      );
    }

    return Response.json(
      {
        success: false,
        message: "Nenhum item encontrado",
      },
      { status: 200 }
    );
  } catch (_) {
    return Response.json(
      {
        success: false,
        message: "Erro ao processar os itens",
      },
      { status: 500 }
    );
  }
};


export const reportUser = async ({
  dailySalesReport,
  commands,
  xTenant,
  period
}) => {

  const periodo = {
  ...periodos[period],
  };

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
            createdAt: { $gte: periodo.start, $lte: periodo.end },
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