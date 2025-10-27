import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const ChartRosca = ({ data, options }) => {

  return (
    <div style={{ width: '350px', height: '350px', margin: '20px auto' }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default ChartRosca;