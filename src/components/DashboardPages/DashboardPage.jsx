import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import LogoutButton from './LogoutButton';
import ExportButton from './ExportButton'; // Import komponen ExportButton
import AddTransactionForm from './AddTransactionForm';
import TransactionTable from './TransactionTable';
import SummaryChart from './SummaryChart';
import CategoryPieChart from './CategoryPieChart';
import '../../styles/dashboard.css';

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ balance: 0, income: 0, expense: 0 });
  const [transactionToEdit, setTransactionToEdit] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    let unsubscribeFirestore = () => {};
    if (user) {
      const transactionsCollection = collection(db, 'transactions');
      let userTransactionsQuery = query(transactionsCollection, where('userId', '==', user.uid));
      
      if (startDate) {
        userTransactionsQuery = query(userTransactionsQuery, where('createdAt', '>=', new Date(startDate)));
      }
      if (endDate) {
        const endOfDay = new Date(endDate);
        endOfDay.setHours(23, 59, 59, 999);
        userTransactionsQuery = query(userTransactionsQuery, where('createdAt', '<=', endOfDay));
      }
      
      if (filterCategory) {
        userTransactionsQuery = query(userTransactionsQuery, where('category', '==', filterCategory));
      }

      unsubscribeFirestore = onSnapshot(userTransactionsQuery, (snapshot) => {
        const transactionList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTransactions(transactionList);
      });
    }

    return () => {
      unsubscribeAuth();
      unsubscribeFirestore();
    };
  }, [user, startDate, endDate, filterCategory]);

  useEffect(() => {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
      
    const totalBalance = totalIncome - totalExpense;

    setSummary({ balance: totalBalance, income: totalIncome, expense: totalExpense });
  }, [transactions]);

  const handleEditTransaction = (transaction) => {
    setTransactionToEdit(transaction);
  };

  if (!user) {
    return <div>Memuat...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Selamat datang di FinTrack!</h1>
        <p>Halo, {user.email}</p>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <ExportButton transactions={transactions} />
          <LogoutButton />
        </div>
      </div>

      <div className="summary-section">
        <div className="summary-cards">
          <div className="summary-card balance-card">
            <h2>Saldo Total</h2>
            <p>Rp{summary.balance.toLocaleString()}</p>
          </div>
          <div className="summary-card income-card">
            <h2>Pemasukan</h2>
            <p>Rp{summary.income.toLocaleString()}</p>
          </div>
          <div className="summary-card expense-card">
            <h2>Pengeluaran</h2>
            <p>Rp{summary.expense.toLocaleString()}</p>
          </div>
        </div>
        <SummaryChart income={summary.income} expense={summary.expense} />
      </div>
      
      <div className="chart-wrapper">
        <CategoryPieChart transactions={transactions} />
      </div>

      <div className="filter-controls">
        <div className="filter-group">
          <label htmlFor="start-date">Dari Tanggal:</label>
          <input
            type="date"
            id="start-date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <label htmlFor="end-date">Sampai Tanggal:</label>
          <input
            type="date"
            id="end-date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <label htmlFor="filter-category">Kategori:</label>
          <select
            id="filter-category"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">Semua</option>
            {[...new Set(transactions.map(t => t.category))].filter(c => c).map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <AddTransactionForm 
        userId={user.uid} 
        transactionToEdit={transactionToEdit}
        setTransactionToEdit={setTransactionToEdit}
      />

      <div className="transactions-list">
        <TransactionTable 
          transactions={transactions} 
          onEdit={handleEditTransaction}
        />
      </div>
    </div>
  );
};

export default DashboardPage;