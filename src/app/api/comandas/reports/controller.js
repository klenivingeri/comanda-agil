import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import { aggregateCategories } from "./aggregations";

// 1. Busca por Dia (Hoje)
const hoje = new Date();
const dataInicioDia = startOfDay(hoje);
const dataFimDia = endOfDay(hoje);

// 2. Busca por Semana (Esta Semana)
const dataInicioSemana = startOfWeek(hoje, { weekStartsOn: 0 }); // 0 para Domingo
const dataFimSemana = endOfWeek(hoje, { weekStartsOn: 0 });

// 3. Busca por Mês (Este Mês)
const dataInicioMes = startOfMonth(hoje);
const dataFimMes = endOfMonth(hoje);

const periodos = {
  day: {
    start: dataInicioDia,
    end: dataFimDia,
  },
  categoriesWeek: {
    start: dataInicioSemana,
    end: dataFimSemana,
  },
  categoriesMonth: {
    start: dataInicioMes,
    end: dataFimMes,
  },
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
      { status: 404 }
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
