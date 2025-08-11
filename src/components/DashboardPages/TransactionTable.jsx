import React from 'react';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import '../../styles/transactions.css';

const TransactionTable = ({ transactions, onEdit }) => {
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'transactions', id));
      console.log("Transaksi berhasil dihapus!");
    } catch (error) {
      console.error("Gagal menghapus transaksi: ", error);
    }
  };

  return (
    <div className="table-container">
      <h3>Daftar Transaksi</h3>
      {transactions.length > 0 ? (
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Deskripsi</th>
              <th>Kategori</th> {/* Kolom baru */}
              <th>Jumlah</th>
              <th>Tipe</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(t => (
              <tr key={t.id} className={t.type === 'expense' ? 'expense-row' : 'income-row'}>
                <td>{new Date(t.createdAt.seconds * 1000).toLocaleDateString()}</td>
                <td>{t.description}</td>
                <td>{t.category || '-'}</td> {/* Tampilkan kategori, atau '-' jika kosong */}
              <td>Rp{t.amount.toLocaleString()}</td>
                <td>{t.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}</td>
                <td>
                  <button onClick={() => onEdit(t)} className="btn-edit">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(t.id)} className="btn-delete">
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Tidak ada transaksi.</p>
      )}
    </div>
  );
};

export default TransactionTable;