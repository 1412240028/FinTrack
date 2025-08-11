import React from 'react';
import { FaFileDownload } from 'react-icons/fa'; // Import icon download

const ExportButton = ({ transactions }) => {
  const handleExport = () => {
    if (transactions.length === 0) {
      alert('Tidak ada transaksi untuk diekspor!');
      return;
    }

    // Header untuk file CSV
    const headers = ["Tanggal", "Deskripsi", "Kategori", "Jumlah", "Tipe"];
    
    // Konversi data transaksi ke format CSV
    const csvContent = transactions.map(t => {
      const date = new Date(t.createdAt.seconds * 1000).toLocaleDateString();
      const amount = t.amount;
      return `${date},"${t.description}",${t.category},${amount},${t.type}`;
    }).join('\n');

    // Gabungkan header dan konten
    const finalCsv = `${headers.join(',')}\n${csvContent}`;

    // Buat objek Blob dari string CSV
    const blob = new Blob([finalCsv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    // Buat URL untuk blob dan atur nama file
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'fintrack_transactions.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <button onClick={handleExport} className="btn-secondary">
      <FaFileDownload style={{ marginRight: '8px' }} /> Export ke CSV
    </button>
  );
};

export default ExportButton;