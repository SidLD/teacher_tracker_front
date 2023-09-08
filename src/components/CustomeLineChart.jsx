import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function CustomeLineChart() {
    const data = {
        labels: ['2020', '2021', '2022', '2023', '232', '2323' , '23232', '232'],
        datasets: [
          {
            label: 'Batch',
            data: [1,2,23,42, 2, 232, 232,23 ,23,],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
    }
  return <Line options={{responsive:true}} data={data} />;
}
