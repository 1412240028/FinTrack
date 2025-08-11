import React from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <button onClick={handleLogout} className="btn-primary logout-btn">
      Logout
    </button>
  );
};

export default LogoutButton;