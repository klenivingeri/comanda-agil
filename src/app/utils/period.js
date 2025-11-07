import { formatInTimeZone } from "date-fns-tz";
import {
  startOfDay,
  endOfDay,
  startOfWeek,
  startOfMonth,
  subHours,
  subDays,
} from "date-fns";

const TIME_ZONE = "America/Sao_Paulo";

const toUtcFromTimeZone = (date) => {
  const isoString = formatInTimeZone(date, TIME_ZONE, "yyyy-MM-dd'T'HH:mm:ssXXX");
  return new Date(isoString);
};

export const getPeriod = (type) => {
  const agora = new Date();
  const ontem = subDays(startOfDay(agora), 1);
  
  const map = {
    day: {
      start: toUtcFromTimeZone(subHours(agora, 24)), // últimas 24h
      end: toUtcFromTimeZone(agora),
    },
    //week: {
    //  start: toUtcFromTimeZone(subDays(ontem, 6)), // 7 dias contando ontem
    //  end: toUtcFromTimeZone(endOfDay(ontem)),     // até ontem 23:59:59
    //},
    week: {
      start: toUtcFromTimeZone(subDays(ontem, 29)), // últimos 30 dias contando ontem
      end: toUtcFromTimeZone(endOfDay(ontem)),   // até ontem 23:59:59
    },
    month: {
      start: toUtcFromTimeZone(subDays(ontem, 29)), // últimos 30 dias contando ontem
      end: toUtcFromTimeZone(endOfDay(ontem)),
    },
    weekCurrent: {
      start: toUtcFromTimeZone(startOfWeek(ontem)),
      end: toUtcFromTimeZone(endOfDay(ontem)),
    },
    monthCurrent: {
      start: toUtcFromTimeZone(startOfMonth(ontem)),
      end: toUtcFromTimeZone(endOfDay(ontem)),
    },
  };

  return map[type] || map.day;
};
