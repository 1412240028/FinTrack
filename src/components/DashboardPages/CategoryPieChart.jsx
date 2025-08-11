import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Daftarkan komponen yang dibutuhkan oleh Chart.js untuk pie chart
ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryPieChart = ({ transactions }) => {
  // Hitung total pengeluaran per kategori
  const expenseByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});

  const labels = Object.keys(expenseByCategory);
  const data = Object.values(expenseByCategory);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Pengeluaran per Kategori (Rp)',
        data: data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="chart-container">
      <h3>Pengeluaran per Kategori</h3>
      {labels.length > 0 ? (
        <Pie data={chartData} />
      ) : (
        <p>Tidak ada data pengeluaran untuk ditampilkan.</p>
      )}
    </div>
  );
};

export default CategoryPieChart;