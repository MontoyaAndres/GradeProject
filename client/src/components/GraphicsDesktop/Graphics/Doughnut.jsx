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
        position: 'top'
      },
      animation: {
        duration: 600,
        easing: 'easeInOutQuart'
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const dataset = data.datasets[tooltipItem.datasetIndex];
            const currentValue = dataset.data[tooltipItem.index];
            return `${currentValue}%`;
          }
        }
      },
      responsive: true,
      responsiveAnimationDuration: 600
    }}
  />
);

export default DoughnutGraphic;
