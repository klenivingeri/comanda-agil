import { formatInTimeZone } from "date-fns-tz";
import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from "date-fns";

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