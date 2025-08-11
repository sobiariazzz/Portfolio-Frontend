import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setAuthToken, getAuthToken } from '../api';

export default function Header() {
  const navigate = useNavigate();
  const token = getAuthToken();
  const logout = () => {
    setAuthToken(null);
    navigate('/login');
  };
  return (
    <header className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-blue-500 shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2">
          <svg className="w-9 h-9 text-white drop-shadow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          <span className="text-3xl font-extrabold text-white tracking-tight drop-shadow">Portfolio Builder</span>
        </Link>
        <nav className="flex items-center gap-4">
          {token ? (
            <button onClick={logout} className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow transition">Logout</button>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 text-white hover:bg-white hover:text-indigo-700 rounded-lg transition font-medium">Login</Link>
              <Link to="/register" className="px-4 py-2 bg-white text-indigo-700 hover:bg-indigo-100 rounded-lg transition font-semibold shadow">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
