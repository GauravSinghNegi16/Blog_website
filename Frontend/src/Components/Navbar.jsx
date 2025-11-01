import React from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../../Context/AppContext';

const Navbar = () => {
  const { navigate, token } = useAppContext();

  const handleClick = () => {
    if (token) {
      navigate('/admin');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 md:px-20 xl:px-32 py-4 sm:py-5">
      <img
        src={assets.logo}
        alt="logo"
        className="w-32 sm:w-40 md:w-48 cursor-pointer"
        onClick={() => navigate('/')}
      />

      <button
        onClick={handleClick}
        className="flex items-center justify-center gap-2 sm:gap-3 bg-primary rounded-full px-6 sm:px-8 md:px-10 py-2 sm:py-2.5 text-white text-sm sm:text-base hover:scale-105 transition-all"
      >
        {token ? 'Dashboard' : 'Login'}
        <img src={assets.arrow} alt="arrow" className="w-2.5 sm:w-3" />
      </button>
    </div>
  );
};

export default Navbar;
