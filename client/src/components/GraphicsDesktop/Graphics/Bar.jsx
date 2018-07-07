import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarGraphic = ({ chartConfig, graphicBy }) => (
  <Bar
    data={chartConfig}
    options={{
      title: {
        display: true,
        text: `Gráfica por ${graphicBy}`,
        fontSize: 25
      },
      legend: {
        display: false,
        position: 'bottom'
      },
      animation: {
        duration: 600,
        easing: 'easeInOutQuart'
      },
      responsive: true,
      responsiveAnimationDuration: 600,
      scales: {
        yAxes: [
          {
            ticks: {
              fixedStepSize: 20,
              max: 100,
              beginAtZero: true,
              autoSkip: false
            }
          }
        ]
      }
    }}
  />
);

export default BarGraphic;
