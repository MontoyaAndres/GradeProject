import React from 'react';
import { Line } from 'react-chartjs-2';

const LineGraphic = ({ chartConfig, graphicBy }) => (
  <Line
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
              callback(tick) {
                return `${tick.toString()}%`;
              }
            }
          }
        ]
      }
    }}
  />
);

export default LineGraphic;
