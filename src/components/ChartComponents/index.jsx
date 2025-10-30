import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { CORES_FIXAS } from 'src/app/utils/constants';

const ChartPizza = dynamic(() => import('./ChartPizza'), {
  ssr: false,
  loading: () => <p>Carregando gráfico...</p>,
});

const ChartRosca = dynamic(() => import('./Doughnut'), {
  ssr: false,
  loading: () => <p>Carregando gráfico...</p>,
});

ChartJS.register(ArcElement, Tooltip, Legend);


const gerarCorAleatoria = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 60%)`;
};

const getChartColors = (numFatias) => {
  const coresFinais = [];

  for (let i = 0; i < numFatias; i++) {
    if (i < CORES_FIXAS.length) {
      coresFinais.push(CORES_FIXAS[i]);
    } else {
      coresFinais.push(gerarCorAleatoria());
    }
  }
  return coresFinais;
};

export const ChartContent = ({ grouped, type }) => {
  const [color, setColor] = useState('#000')

  const labels = grouped.map(item => item.product.name);
  const dataValues = grouped.map(item => item.totalQuantity);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setColor(savedTheme === 'dark' ? '#fff' : '#000')
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color,
          font: {
            size: 14,
          }
        }
      },
      title: {
        display: true,
        text: 'Distribuição de Vendas por Categoria',
        color,
      },
    },
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Total de Unidades Vendidas',
        data: dataValues,
        backgroundColor: getChartColors(labels.length),
        hoverOffset: 1,
        borderWidth: 0
      },
    ],
  };

  if (type === 'pizza') {
    return <ChartPizza
      data={data}
      options={options}
    />
  }

  if (type === 'rosca') {
    return <ChartRosca
      data={data}
      options={options}
    />
  }

  return null
}