import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const HealthCharts = ({ entries }) => {
  // Prepare data for charts
  const last7Entries = entries.slice(0, 7).reverse();

  // Mood distribution
  const moodCounts = entries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {});

  // Line chart data - Sleep hours over time
  const sleepData = {
    labels: last7Entries.map(entry => 
      new Date(entry.date).toLocaleDateString()
    ),
    datasets: [
      {
        label: 'Sleep Hours',
        data: last7Entries.map(entry => entry.sleepHours),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  // Mood distribution chart
  const moodData = {
    labels: Object.keys(moodCounts),
    datasets: [
      {
        label: 'Mood Distribution',
        data: Object.values(moodCounts),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="health-charts">
      <h3>Health Insights</h3>
      <div className="charts-grid">
        <div className="chart-container">
          <h4>Sleep Pattern (Last 7 entries)</h4>
          <Line data={sleepData} options={chartOptions} />
        </div>
        <div className="chart-container">
          <h4>Mood Distribution</h4>
          <Doughnut data={moodData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default HealthCharts;