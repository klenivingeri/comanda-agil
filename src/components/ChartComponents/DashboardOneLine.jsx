"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";
import { format } from "date-fns";
import { BUTTON_THEMES } from "src/app/utils/constants";


ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  TimeScale
);

const ChartLine = ({ items = [], tab = 'day' }) => {
  const [baseDate] = useState(() => new Date());
  const [colorCurrent, setColorCurrent] = useState('default')
  useEffect(() => {
    const color = localStorage.getItem('theme-button')
    setColorCurrent(color)
  }, [])

  const isDay = tab === 'day';
  const isWeek = tab === 'week';
  const isMonth = tab === 'month';

  const labelsObj = useMemo(() => {
    const now = baseDate;
    const dayLabels = Array.from({ length: 24 }, (_, i) => {
      const d = new Date(now);
      d.setHours(now.getHours() - (23 - i));
      d.setMinutes(0, 0, 0);
      return d;
    });

    const weekLabels = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(now);
      d.setDate(now.getDate() -1 - i);
      d.setHours(0, 0, 0, 0);
      return d;
    }).reverse();

    const monthLabels = Array.from({ length: 30 }, (_, i) => {
      const d = new Date(now);
      d.setDate(now.getDate() -1 - i);
      d.setHours(0, 0, 0, 0);
      return d;
    }).reverse();

    return {
      day: dayLabels,
      week: weekLabels,
      month: monthLabels,
    };
  }, [baseDate]);

  const labels = labelsObj[isDay ? 'day' : isWeek ? 'week' : 'month'];

  const values = useMemo(() => {
    return labels.map((start) => {
      const end = new Date(start);

      if (isDay) {
        end.setHours(start.getHours() + 1);
      } else if (isWeek || isMonth) {
        end.setDate(start.getDate() + 1);
      }

      const total = items.reduce((sum, item) => {
        const created = new Date(item.createdAt);

        if (created >= start && created < end) {
          return sum + (item.quantity ?? 1);
        }
        return sum;
      }, 0);

      return total;
    });
  }, [items, labels, tab]);

  const data = {
    labels,
    datasets: [
      {
        data: values,
        borderColor: BUTTON_THEMES[colorCurrent]?.['--button-default'] || "rgba(75,192,192,1)",
        backgroundColor: BUTTON_THEMES[colorCurrent]?.['--button-disabled'] || "rgba(75,192,192,0.2)",
        tension: 0.3,
        fill: true,
        pointRadius: 4,
      },
    ],
  };

  const getUnit = () => {
    if (isDay) return 'hour';
    // Semana e Mês usam a unidade 'day'
    if (isWeek || isMonth) return 'day';
    return 'day';
  };

  const getDisplayFormats = () => {
    if (isDay) return { hour: 'HH:mm' };
    if (isWeek) return { day: 'dd/MM' };
    if (isMonth) return { day: 'dd' }; // Exibe apenas o dia (01, 02, 03...)
    return { day: 'dd/MM' };
  };

  const getTitleText = () => {
    if (isDay) return 'Hora';
    if (isWeek) return 'Dias';
    if (isMonth) return 'Dia do Mês';
    return 'Período';
  };

  const getTooltipTitle = (ctx) => {
    const date = new Date(ctx[0].parsed.x);
    if (isDay) return format(date, 'HH:mm') + 'h';
    if (isWeek || isMonth) return format(date, 'dd/MM/yyyy');
    return format(date, 'dd/MM/yyyy');
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false, position: 'top' },
      tooltip: {
        callbacks: {
          title: getTooltipTitle,
        },
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: getUnit(),
          displayFormats: getDisplayFormats(),
          stepSize: isMonth ? 10 : undefined,
        },
        title: {
          display: false,
          text: getTitleText(),
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: isMonth ? 15 : undefined,
        },
      },
      y: {
  beginAtZero: true,
  ticks: {
    stepSize: 10, // define passos de 10 em 10
  },
},
    },
  };

  return (
    <div style={{ width: "100%", maxWidth: 700, margin: "20px auto" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export const DashboardOneLine = ({ allSubOrders = [], tab }) => {

  return (
    <div className="">
      <ChartLine items={allSubOrders} tab={tab} />
    </div>
  );
}
