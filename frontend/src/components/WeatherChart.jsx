import React from 'react';
import { Line } from 'react-chartjs-2';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WeatherChart = ({ weatherData, showTemp, showHumidity, loading }) => {
  const getChartData = () => {
    if (!weatherData || !weatherData.data || weatherData.data.length === 0) {
      return null;
    }

    const labels = weatherData.data.map((item) => item.date);
    const datasets = [];

    if (showTemp) {
      datasets.push({
        label: 'Temperature (°C)',
        data: weatherData.data?.map(
          (item) => item.temperature || item.avgTemperature
        ),
        borderColor: '#5682B1',
        backgroundColor: 'rgba(86, 130, 177, 0.2)',
        tension: 0.4,
      });
    }

    if (showHumidity) {
      datasets.push({
        label: 'Humidity (%)',
        data: weatherData.data?.map((item) => item.humidity || item.avgHumidity),
        borderColor: '#739EC9',
        backgroundColor: 'rgba(115, 158, 201, 0.2)',
        tension: 0.4,
      });
    }

    return { labels, datasets };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#FFE8DB',
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#b8b8b8' },
        grid: { color: '#2a2a2a' },
      },
      y: {
        ticks: { color: '#b8b8b8' },
        grid: { color: '#2a2a2a' },
      },
    },
  };

  const chartData = getChartData();

  if (loading) {
    return (
      <div className="text-center py-16 text-[#b8b8b8]">Loading chart...</div>
    );
  }

  if (!chartData) {
    return (
      <div className="text-center py-16 text-[#b8b8b8]">
        Select filters to view weather data
      </div>
    );
  }

  return (
    <div className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-6">
      <div className="h-96">
        <Line data={chartData} options={chartOptions} />
      </div>
      {weatherData.isAveraged && (
        <p className="text-center text-sm text-[#b8b8b8] mt-4">
          Showing averaged data for {weatherData.siteCount} sites
        </p>
      )}
    </div>
  );
};

export default WeatherChart;
