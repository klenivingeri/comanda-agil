import { aggregateCategories } from "./aggregations";
import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

const TIME_ZONE = "America/Sao_Paulo";

// Converte uma data para UTC, considerando o timezone
const toUtcFromTimeZone = (date) => {
  const isoString = formatInTimeZone(date, TIME_ZONE, "yyyy-MM-dd'T'HH:mm:ssXXX");
  return new Date(isoString);
};

// Função helper para gerar períodos
export const getPeriod = (type) => {
  const hoje = new Date();

  const map = {
    day: {
      start: toUtcFromTimeZone(startOfDay(hoje)),
      end: toUtcFromTimeZone(endOfDay(hoje)),
    },
    week: {
      start: toUtcFromTimeZone(startOfWeek(hoje, { weekStartsOn: 0 })),
      end: toUtcFromTimeZone(endOfWeek(hoje, { weekStartsOn: 0 })),
    },
    month: {
      start: toUtcFromTimeZone(startOfMonth(hoje)),
      end: toUtcFromTimeZone(endOfMonth(hoje)),
    },
  };

  return map[type] || map.day;
};

const periodos = {
  day: getPeriod("day"),
  categoriesWeek: getPeriod("week"),
  categoriesMonth: getPeriod("month"),
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
