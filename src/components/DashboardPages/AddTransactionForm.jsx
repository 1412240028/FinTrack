import React, { useState, useEffect } from 'react';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import '../../styles/forms.css';

const AddTransactionForm = ({ userId, transactionToEdit, setTransactionToEdit }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState(''); // State untuk kategori sudah benar

  // Gunakan useEffect untuk mengisi form saat ada transaksi yang diedit
  useEffect(() => {
    if (transactionToEdit) {
      setDescription(transactionToEdit.description);
      setAmount(transactionToEdit.amount);
      setType(transactionToEdit.type);
      setCategory(transactionToEdit.category || ''); // Tambahkan baris ini
    } else {
      // Kosongkan form saat tidak ada transaksi yang diedit
      setDescription('');
      setAmount('');
      setType('expense');
      setCategory(''); // Tambahkan baris ini
    }
  }, [transactionToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description || !amount) {
      alert('Deskripsi dan jumlah harus diisi!');
      return;
    }

    try {
      if (transactionToEdit) {
        // Mode Edit: Perbarui data yang sudah ada
        const transactionRef = doc(db, 'transactions', transactionToEdit.id);
        await updateDoc(transactionRef, {
          description,
          amount: parseFloat(amount),
          type,
          category, // Tambahkan baris ini
        });
        console.log("Transaksi berhasil diperbarui!");
        setTransactionToEdit(null); // Keluar dari mode edit
      } else {
        // Mode Tambah: Tambahkan data baru
        await addDoc(collection(db, 'transactions'), {
          userId: userId,
          description: description,
          amount: parseFloat(amount),
          type: type,
          category: category, // Tambahkan baris ini
          createdAt: new Date(),
        });
        console.log("Transaksi berhasil ditambahkan!");
      }
      
      // Bersihkan form setelah sukses
      setDescription('');
      setAmount('');
      setType('expense');
      setCategory(''); // Bersihkan juga state kategori
    } catch (error) {
      console.error("Error submitting form: ", error);
      alert('Gagal memproses transaksi.');
    }
  };

  const handleCancelEdit = () => {
    setTransactionToEdit(null);
  };

  return (
    <div className="form-container">
      <h3>{transactionToEdit ? 'Edit Transaksi' : 'Tambah Transaksi Baru'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="description">Deskripsi</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Kategori</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Jumlah (Rp)</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Tipe</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                value="expense"
                checked={type === 'expense'}
                onChange={(e) => setType(e.target.value)}
              /> Pengeluaran
            </label>
            <label>
              <input
                type="radio"
                value="income"
                checked={type === 'income'}
                onChange={(e) => setType(e.target.value)}
              /> Pemasukan
            </label>
          </div>
        </div>
        <button type="submit" className="btn-primary">
          {transactionToEdit ? 'Simpan Perubahan' : 'Tambah'}
        </button>
        {transactionToEdit && (
          <button type="button" onClick={handleCancelEdit} className="btn-cancel">
            Batal
          </button>
        )}
      </form>
    </div>
  );
};

export default AddTransactionForm;