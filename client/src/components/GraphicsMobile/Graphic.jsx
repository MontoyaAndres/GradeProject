import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieGraphic = ({ chartConfig, graphicBy }) => (
  <Pie
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
      maintainAspectRatio: false,
      responsiveAnimationDuration: 600
    }}
  />
);

export default PieGraphic;
