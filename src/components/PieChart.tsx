// components/PieChart.tsx
'use client';

import { Pie } from 'react-chartjs-2';
import { ActivityReport } from '@/types/report';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  data: ActivityReport[];
};

const PieChart: React.FC<Props> = ({ data }) => {
  const chartData = {
    labels: data.map((d) => d.activityName),
    datasets: [
      {
        label: '# of Sessions',
        data: data.map((d) => d.count),
        backgroundColor: [
          'rgba(59, 130, 246, 0.5)', // Blue
          'rgba(249, 115, 22, 0.5)', // Orange
          'rgba(16, 185, 129, 0.5)', // Green
          'rgba(67, 56, 202, 0.5)', // Purple
          // Add more colors as needed
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(249, 115, 22, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(67, 56, 202, 1)',
          // Add more border colors as needed
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Sessions Distribution per Activity',
      },
    },
  };

  return (
    <div className="h-80">
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
