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
  scoreKey?: 'score' | 'matchScore';
  title?: string;
}

export function ScoreChart({ 
  teams, 
  color = '#1e3a8a', 
  titleColor = '#1e3a8a',
  maxY = 10,
  scoreKey = 'score',
  title = 'Visualisasi Poin Akhir'
}: ScoreChartProps) {
  const data = {
    labels: teams.map((t) => t.name),
    datasets: [
      {
        label: 'Poin Akhir',
        data: teams.map((t) => t[scoreKey] || 0),
        backgroundColor: (context: any) => {
          const value = context.raw;
          if (value >= 10) return '#fbbf24'; // Gold for 10
          if (value >= 7.5) return '#94a3b8'; // Silver for 7.5
          if (value >= 5) return '#b45309'; // Bronze for 5
          return '#3b82f6'; // Blue for 3
        },
        borderColor: '#1e3a8a',
        borderWidth: 2,
        borderRadius: 12,
        hoverBorderWidth: 4,
      },
    ],
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          font: {
            weight: 'bold' as const,
            family: 'Plus Jakarta Sans',
          },
          usePointStyle: true,
          pointStyle: 'rectRounded',
        }
      },
      title: {
        display: true,
        text: title,
        color: titleColor,
        font: {
          size: 24,
          weight: 'black' as const,
          family: 'Plus Jakarta Sans',
        },
        padding: { top: 10, bottom: 30 },
      },
      datalabels: {
        display: true,
        color: '#1e3a8a',
        align: 'top' as const,
        anchor: 'end' as const,
        offset: 4,
        font: {
          weight: 'black' as const,
          size: 16,
          family: 'Plus Jakarta Sans',
        },
        formatter: (value: number) => value.toString().replace('.', ','),
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: maxY,
        title: {
          display: true,
          text: 'Poin Turnamen',
          color: '#1e3a8a',
          font: {
            size: 14,
            weight: 'bold' as const,
            family: 'Plus Jakarta Sans',
          }
        },
        grid: {
          color: 'rgba(30, 58, 138, 0.1)',
        },
        ticks: {
          stepSize: 1,
          color: '#1e3a8a',
          font: {
            weight: 'bold' as const,
          },
        },
      },
      x: {
        title: {
          display: true,
          text: 'Daftar Kelompok',
          color: '#1e3a8a',
          font: {
            size: 14,
            weight: 'bold' as const,
            family: 'Plus Jakarta Sans',
          }
        },
        grid: {
          display: false,
        },
        ticks: {
          color: '#1e3a8a',
          font: {
            weight: 'black' as const,
            size: 12,
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
