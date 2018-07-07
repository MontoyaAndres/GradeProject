import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const DoughnutGraphic = ({ chartConfig, graphicBy }) => (
  <Doughnut
    data={chartConfig}
    options={{
      title: {
        display: true,
        text: `Gráfica por ${graphicBy}`,
        fontSize: 25
      },
      legend: {
        display: true,
        position: 'bottom'
      },
      animation: {
        duration: 600,
        easing: 'easeInOutQuart'
      },
      responsive: true,
      responsiveAnimationDuration: 600
    }}
  />
);

export default DoughnutGraphic;
