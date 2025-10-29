import { getPeriod } from "src/app/utils/period";
import { aggregateCategories } from "./aggregations";

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