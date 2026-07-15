import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  
  // State to hold user info (defaults to fallback values if not found)
  const [user, setUser] = useState({
    fullName: 'Student',
    email: 'student@university.edu'
  });

  useEffect(() => {
    // 1. Try to fetch the stored user data from localStorage
    const loadUserData = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    loadUserData();

    window.addEventListener('profileUpdated', loadUserData);
    return () => {
      window.removeEventListener('profileUpdated', loadUserData);
    };
  }, []);

  // 2. Helper function to generate initials dynamically from the name
  const getInitials = (name) => {
    if (!name) return '??';
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2); // Limit to 2 characters max
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-8 flex items-center justify-between">
      {/* Left side info */}
      <div className="text-xs text-slate-400 font-medium">
        System Status: <span className="text-emerald-500 font-bold">● Online</span>
      </div>

      {/* Right side Profile Details badge action */}
      <div className="flex items-center gap-4">
        <div className="flex flex-col text-right">
          {/* DYNAMIC NAME */}
          <span className="text-sm font-semibold text-slate-900">
            Welcome, {user.fullName}
          </span>
          {/* DYNAMIC EMAIL */}
          <span className="text-[10px] font-medium text-slate-400">
            {user.email}
          </span>
        </div>
        
        {/* DYNAMIC AVATAR INITIALS */}
        <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm border border-blue-200 shadow-sm">
          {getInitials(user.fullName)}
        </div>

        {/* Log Out Button */}
        <button 
          onClick={() => {
            localStorage.removeItem('user'); // Clear data on logout
            navigate('/login');
          }} 
          className="ml-2 text-xs font-semibold text-slate-400 hover:text-rose-600 transition-colors p-1"
        >
          Logout
        </button>
      </div>
    </header>
  );
}