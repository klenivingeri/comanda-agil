import React from 'react';
import { Pie } from 'react-chartjs-2';

const ChartPizza = ({ data, options }) => {

  return (
    <div style={{ width: '350px', height: '350px', margin: '20px auto' }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default ChartPizza;