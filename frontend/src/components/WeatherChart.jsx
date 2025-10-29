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

    const labels = weatherData.data.map((item) => item.date.split('T')[0]);
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
        pointRadius: 4,
        pointHoverRadius: 6,
      });
    }

    if (showHumidity) {
      datasets.push({
        label: 'Humidity (%)',
        data: weatherData.data?.map((item) => item.humidity || item.avgHumidity),
        borderColor: '#FF8C00', // Orange color
        backgroundColor: 'rgba(255, 140, 0, 0.2)', // Orange with transparency
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      });
    }

    return { labels, datasets };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#FFE8DB',
          font: {
            size: window.innerWidth < 768 ? 10 : 12,
          },
          padding: window.innerWidth < 768 ? 10 : 15,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#FFE8DB',
        bodyColor: '#FFE8DB',
        borderColor: '#2a2a2a',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: { 
          color: '#b8b8b8',
          font: {
            size: window.innerWidth < 768 ? 9 : 11,
          },
          maxRotation: window.innerWidth < 768 ? 45 : 0,
          minRotation: window.innerWidth < 768 ? 45 : 0,
        },
        grid: { 
          color: '#2a2a2a',
          drawBorder: false,
        },
      },
      y: {
        ticks: { 
          color: '#b8b8b8',
          font: {
            size: window.innerWidth < 768 ? 9 : 11,
          },
        },
        grid: { 
          color: '#2a2a2a',
          drawBorder: false,
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  };

  const chartData = getChartData();

  if (loading) {
    return (
      <div className="text-center py-12 md:py-16 text-[#b8b8b8] bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg">
        Loading chart...
      </div>
    );
  }

  if (!chartData) {
    return (
      <div className="text-center py-12 md:py-16 text-[#b8b8b8] bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg">
        Select filters to view weather data
      </div>
    );
  }

  return (
    <div className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-4 md:p-6">
      {/* Responsive height - smaller on mobile */}
      <div className="h-64 sm:h-80 md:h-96">
        <Line data={chartData} options={chartOptions} />
      </div>
      {weatherData.isAveraged && (
        <p className="text-center text-xs md:text-sm text-[#b8b8b8] mt-3 md:mt-4">
          Showing averaged data for {weatherData.siteCount} sites
        </p>
      )}
    </div>
  );
}; 

export default WeatherChart;
