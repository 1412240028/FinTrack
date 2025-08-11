import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Daftarkan komponen yang dibutuhkan oleh Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SummaryChart = ({ income, expense }) => {
  const data = {
    labels: ['Pemasukan', 'Pengeluaran'],
    datasets: [
      {
        label: 'Ringkasan Keuangan',
        data: [income, expense],
        backgroundColor: [
          'rgba(52, 211, 153, 0.6)', // Hijau untuk pemasukan
          'rgba(239, 68, 68, 0.6)',   // Merah untuk pengeluaran
        ],
        borderColor: [
          'rgba(52, 211, 153, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Ringkasan Pemasukan & Pengeluaran',
      },
    },
  };

  return (
    <div className="chart-container">
      <Bar data={data} options={options} />
    </div>
  );
};

export default SummaryChart;