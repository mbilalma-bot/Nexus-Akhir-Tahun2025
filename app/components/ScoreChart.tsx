import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import type { Team } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

interface ScoreChartProps {
  teams: Team[];
  color?: string;
  titleColor?: string;
  maxY?: number;
}

export function ScoreChart({ 
  teams, 
  color = '#1e3a8a', 
  titleColor = '#1e3a8a',
  maxY = 70
}: ScoreChartProps) {
  const data = {
    labels: teams.map((t) => t.name),
    datasets: [
      {
        label: 'Total Poin',
        data: teams.map((t) => t.score),
        backgroundColor: `${color}cc`,
        borderColor: color,
        borderWidth: 2,
        borderRadius: 8,
        hoverBackgroundColor: color,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Statistik Poin',
        color: titleColor,
        font: {
          size: 20,
          weight: 'bold' as const,
          family: 'Plus Jakarta Sans',
        },
        padding: 20,
      },
      datalabels: {
        display: true,
        color: titleColor,
        align: 'top' as const,
        anchor: 'end' as const,
        font: {
          weight: 'bold' as const,
          size: 14,
        },
        formatter: (value: number) => value,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: maxY,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          stepSize: maxY <= 40 ? 5 : 10,
          font: {
            weight: 'bold' as const,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            weight: 'bold' as const,
          },
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-2xl h-[500px] border border-blue-50">
      <Bar data={data} options={options} />
    </div>
  );
}
