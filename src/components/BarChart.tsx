// components/BarChart.tsx
'use client';

import { Bar } from 'react-chartjs-2';
import { ActivityReport } from '@/types/report';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

type Props = {
  data: ActivityReport[];
};

const BarChart: React.FC<Props> = ({ data }) => {
  const chartData = {
    labels: data.map((d) => d.activityName),
    datasets: [
      {
        label: '# of Sessions',
        data: data.map((d) => d.count),
        backgroundColor: 'rgba(59, 130, 246, 0.5)', // Blue
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Sessions per Activity',
      },
    },
  };

  return (
    <div className="h-80">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
