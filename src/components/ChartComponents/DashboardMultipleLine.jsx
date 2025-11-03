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
import { BUTTON_THEMES, CORES_FIXAS } from "src/app/utils/constants";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, TimeScale);


const ChartLineMulti = ({ items = [], tab = 'day' }) => {
  const [baseDate] = useState(() => new Date());
  const [colorCurrent, setColorCurrent] = useState('default');

  useEffect(() => {
    const color = localStorage.getItem('theme-button');
    setColorCurrent(color);
  }, []);

  const isDay = tab === 'day';
  const isWeek = tab === 'week';
  const isMonth = tab === 'month';


  const getDisplayFormats = () => {
    if (isDay) return { hour: 'HH:mm' };
    if (isWeek) return { day: 'dd/MM' };
    if (isMonth) return { day: 'dd' }; // Exibe apenas o dia (01, 02, 03...)
    return { day: 'dd/MM' };
  };

  const getUnit = () => {
    if (isDay) return 'hour';
    if (isWeek || isMonth) return 'day';
    return 'day';
  };

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

    return { day: dayLabels, week: weekLabels, month: monthLabels };
  }, [baseDate]);

  const labels = labelsObj[isDay ? 'day' : isWeek ? 'week' : 'month'];

  // 🔹 Agrupa por categoria ou produto e calcula quantidade por label
  const processedData = useMemo(() => {
    if (!items?.length) return { keys: [], dataByKey: {} };

    const keys = [...new Set(items.map(item => item.product?.category?.name || item.product?.name || 'Produto Desconhecido'))];
    const dataByKey = {};

    keys.forEach(k => {
      dataByKey[k] = new Array(labels.length).fill(0);
    });

    labels.forEach((start, idx) => {
      const end = new Date(start);
      if (isDay) end.setHours(start.getHours() + 1);
      else end.setDate(start.getDate() + 1);

      items.forEach(item => {
        const created = new Date(item.createdAt);
        if (created >= start && created < end) {
          const key = item.product?.category?.name || item.product?.name || 'Produto Desconhecido';
          dataByKey[key][idx] += item.quantity ?? 1;
        }
      });
    });

    return { keys, dataByKey };
  }, [items, labels, isDay]);

  // 🔹 Transformar em datasets do Chart.js
  const data = useMemo(() => {
    const { keys, dataByKey } = processedData;
    const datasets = keys.map((key, i) => ({
      label: key,
      data: dataByKey[key],
      borderColor: CORES_FIXAS[i % CORES_FIXAS.length],
      backgroundColor: CORES_FIXAS[i % CORES_FIXAS.length],
      tension: 0.3,
      fill: false,
      pointRadius: 4,
    }));

    return { labels, datasets };
  }, [processedData, labels]);

  // 🔹 Opções do gráfico
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'bottom' },
      tooltip: {
        callbacks: {
          title: (ctx) => {
            const date = new Date(ctx[0].parsed.x);
            return isDay ? format(date, 'HH:mm') + 'h' : format(date, 'dd/MM/yyyy');
          },
          label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y}`,
        },
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: getUnit(),
          displayFormats: getDisplayFormats(),
        },
        title: { display: false },
        grid: {
          color: BUTTON_THEMES[colorCurrent]?.['--button-disabled'] || "#ccc",
          borderColor: BUTTON_THEMES[colorCurrent]?.['--button-disabled'] || "#ccc",
        },
      },
      y: {
        beginAtZero: true,
        ticks: { stepSize: 10 },
        grid: {
          color: BUTTON_THEMES[colorCurrent]?.['--button-disabled'] || "#ccc",
          borderColor: BUTTON_THEMES[colorCurrent]?.['--button-disabled'] || "#ccc",
        },
      },

    },
  };

  return (
    <div style={{ width: "100%", maxWidth: 800, margin: "20px auto", height: 400 }}>
      <Line data={data} options={options} />
    </div>
  );
};

export const DashboardMultipleLine = ({ allSubOrders = [], tab }) => {
  return (
    <div>
      <ChartLineMulti items={allSubOrders} tab={tab} />
    </div>
  );
}
