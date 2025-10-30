"use client";
import React, { useMemo } from "react";
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

// 🚨 1. DEFINIÇÃO DAS CORES FIXAS
// Você pode adicionar mais cores conforme necessário.
const CORES_FIXAS = [
  '#007BFF', // Azul
  '#28A745', // Verde
  '#DC3545', // Vermelho
  '#FFC107', // Amarelo
  '#17A2B8', // Ciano
  '#6F42C1', // Roxo
  '#FD7E14', // Laranja
  '#20C997', // Turquesa
  '#6C757D', // Cinza
  '#000000', // Preto (para o 10º produto, se houver)
];
// 🚨 Se houver mais produtos do que cores, as cores se repetirão ciclicamente.

// ❌ REMOÇÃO da função generateColor, pois não é mais necessária.

/**
 * Componente de gráfico de linhas com múltiplas linhas, uma por produto.
 * @param {Array} items - Array de pedidos/itens com 'product.name', 'totalQuantity' e 'createdAt'.
 * @param {boolean} isDay - true para últimas 24h (por hora), false para últimos 7 dias (por dia).
 */
const ChartLineMultiProduct = ({ items = [], isDay = true }) => {
  const now = new Date();

  // 🔹 1. Gera labels (os pontos de tempo: horas ou dias)
  const labels = useMemo(() => {
    if (isDay) {
      // Últimas 24h (hora inicial de cada intervalo)
      return Array.from({ length: 24 }, (_, i) => {
        const d = new Date(now);
        // Garante que o rótulo da hora seja o início do intervalo
        d.setHours(now.getHours() - (23 - i));
        d.setMinutes(0, 0, 0);
        return d;
      });
    } else {
      // Últimos 7 dias (dia inicial de cada intervalo)
      return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(now);
        d.setDate(now.getDate() - (6 - i));
        d.setHours(0, 0, 0, 0);
        return d;
      });
    }
  }, [isDay, now]);

  // 🔹 2. Processa os dados para agrupar por Produto e por Período
  const processedData = useMemo(() => {
    // Primeiro, cria um Set para obter todos os nomes de produtos únicos
    const productNames = [...new Set(items.map(item => item.product?.name).filter(Boolean))];

    // Estrutura de dados para armazenar a quantidade de cada produto em cada ponto de tempo
    const dataByProduct = productNames.reduce((acc, name) => {
      acc[name] = new Array(labels.length).fill(0); // Inicializa com zeros
      return acc;
    }, {});

    // Itera sobre os labels (intervalos de tempo) para preencher os dados
    labels.forEach((start, labelIndex) => {
      const end = new Date(start);
      // Define o final do intervalo: próxima hora ou próximo dia
      if (isDay) end.setHours(start.getHours() + 1);
      else end.setDate(start.getDate() + 1);

      // Filtra os itens que caem neste intervalo de tempo
      const itemsInInterval = items.filter(item => {
        const created = new Date(item.createdAt);
        return created >= start && created < end;
      });

      // Soma a quantidade para cada produto neste intervalo
      itemsInInterval.forEach(item => {
        const productName = item.product?.name;
        if (productName && dataByProduct[productName]) {
          // Usa 'totalQuantity' se existir, caso contrário, conta como 1
          dataByProduct[productName][labelIndex] += item.totalQuantity ?? 1;
        }
      });
    });

    return { productNames, dataByProduct };
  }, [items, labels, isDay]);


  // 🔹 3. Transforma os dados processados no formato que o Chart.js espera
  const data = useMemo(() => {
    const { productNames, dataByProduct } = processedData;

    const datasets = productNames.map((name, i) => {
        const color = CORES_FIXAS[i]; // Cor fixa para cada produto

        return {
            label: name,
            data: dataByProduct[name],
            borderColor: color,
            backgroundColor: color, // Cor um pouco transparente
            tension: 0.3,
            fill: false, // Não preencher a área abaixo da linha
            pointRadius: 4,
        };
    });

    return {
      labels,
      datasets,
    };
  }, [labels, processedData]);


  // 🔹 4. Configurações do gráfico (opções) - Sem alterações aqui
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Permite maior controle de tamanho
    plugins: {
      legend: { display: false, position: "bottom" },
      tooltip: {
        callbacks: {
          title: (ctx) => {
            // Formato de data/hora no Tooltip
            const date = ctx[0].parsed.x;
            return isDay
              ? format(date, "HH:mm") + "h" // Horário para 24h
              : format(date, "dd/MM/yyyy"); // Data para 7 dias
          },
          label: (ctx) => {
            // Label no Tooltip: Nome do Produto: Quantidade
            const label = ctx.dataset.label || '';
            const value = ctx.parsed.y;
            return `${label}: ${value}`;
          },
        },
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: isDay ? "hour" : "day", // Unidade de tempo
          displayFormats: isDay
            ? { hour: "HH:mm" }
            : { day: "dd/MM" },
        },
        title: {
          display: true,
          text: isDay ? "Hora" : "Dia",
        },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: "Quantidade Total" },
      },
    },
  };

  return (
    <div style={{ width: "100%", maxWidth: 800, margin: "20px auto", height: isDay ? 400 : 350 }}>
      <Line data={data} options={options} />
    </div>
  );
};

// ---
// Exemplo de uso no seu Dashboard
// ---

export default function Dashboard({ allSubOrders = [], isDay }) {
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>
        {isDay ? "Vendas por Produto (últimas 24h)" : "Vendas por Produto (últimos 7 dias)"}
      </h2>
      <ChartLineMultiProduct items={allSubOrders} isDay={isDay} />
    </div>
  );
}