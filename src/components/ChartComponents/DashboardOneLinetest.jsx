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

// Registrar os componentes necessários
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  TimeScale
);


const ChartLine = ({ items = [], isDay = true }) => {
  const [colorCurrent, setColorCurrent] = useState('default')
  useEffect(() => {
    const color = localStorage.getItem('theme-button')
    setColorCurrent(color)

  }, [])
  const now = new Date();

  // 🔹 Gera labels — se for isDay true → horas; se não → dias
  const labels = useMemo(() => {
    if (isDay) {

      return Array.from({ length: 24 }, (_, i) => {
        const d = new Date(now);
        d.setHours(now.getHours() - (23 - i));
        d.setMinutes(0, 0, 0);
        return d;
      });
    } else {
      // Últimos 7 dias
      return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(now);
        d.setDate(now.getDate() - (6 - i));
        d.setHours(0, 0, 0, 0);
        return d;
      });
    }
  }, [isDay, now]);

  // 🔹 Conta quantos itens existem por hora/dia
  const values = useMemo(() => {
    return labels.map((start) => {
      const end = new Date(start);
      if (isDay) end.setHours(start.getHours() + 1);
      else end.setDate(start.getDate() + 1);

      // soma quantidade (ou conta ocorrências)
      const total = items.reduce((sum, item) => {
        const created = new Date(item.createdAt);
        if (created >= start && created < end) {
          return sum + (item.quantity ?? 1);
        }
        return sum;
      }, 0);

      return total;
    });
  }, [items, labels, isDay]);

  const data = {
    labels,
    datasets: [
      {
        label: isDay ? "Pedidos nas últimas 24h" : "Pedidos nos últimos 7 dias",
        data: values,
        borderColor: BUTTON_THEMES[colorCurrent]?.['--button-default'] || "rgba(75,192,192,1)",
        backgroundColor: BUTTON_THEMES[colorCurrent]?.['--button-disabled'] || "rgba(75,192,192,0.2)",
        tension: 0.3,
        fill: true,
        pointRadius: 4,
      },
    ],
  };

  // 🔹 Configurações do gráfico
  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
      tooltip: {
        callbacks: {
          title: (ctx) => {
            const date = ctx[0].parsed.x;
            return isDay
              ? format(date, "HH:mm") + "h"
              : format(date, "dd/MM/yyyy");
          },
        },
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: getUnit(),
          displayFormats: getDisplayFormats(),
        },
          title: {
            display: true,
            text: isDay ? "Hora" : "Dia",
          },
        },

      },
    };

    return(
    <div style = {{ width: "100%", maxWidth: 700, margin: "20px auto" }} >
    <Line data={data} options={options} />
    </div >
  );
};

export default function Dashboard({ allSubOrders = [], isDay }) {
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>
        {isDay ? "Atividade nas últimas 24 horas" : "Atividade nos últimos dias"}
      </h2>
      <ChartLine items={allSubOrders} isDay={isDay} />
    </div>
  );
}
