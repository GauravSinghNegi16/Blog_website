import React from 'react';
import axios from 'axios';
import { assets } from '../../assets/assets';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../Components/Admin/Sidebar';
import { useAppContext } from '../../../Context/AppContext';

const Layout = () => {
  const { navigate, setToken } = useAppContext();

  const logOut = async () => {
    try {
      // 🔹 Optional: call backend logout route if it exists
      await axios.post('http://localhost:3000/api/admin/logout', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    } catch (error) {
      console.log('Logout error (safe to ignore if no backend route):', error.message);
    }

    // 🔹 Clear local token & axios header
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setToken(null);

    // 🔹 Redirect to login page
    navigate("/", { replace: true });
  };

  return (
    <div className="flex flex-col h-screen">
      {/* 🔹 Header */}
      <header className="flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200">
        <img
          src={assets.logo}
          alt="Logo"
          className="w-32 sm:w-40 cursor-pointer"
          onClick={() => navigate('/')}
        />
        <button
          onClick={logOut}
          className="text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer hover:bg-primary/90 transition-all"
        >
          Log out
        </button>
      </header>

      {/* 🔹 Main layout */}
      <main className="flex flex-1">
        <Sidebar />
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
