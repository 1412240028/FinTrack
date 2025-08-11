import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import LoginPage from './components/AuthPages/LoginPage';
import DashboardPage from './components/DashboardPages/DashboardPage';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>; // Tampilkan loading screen
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={user ? <DashboardPage /> : <LoginPage />} />
        <Route path="/dashboard" element={user ? <DashboardPage /> : <LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;