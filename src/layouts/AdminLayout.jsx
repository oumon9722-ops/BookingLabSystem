import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';

export default function AdminLayout() {
  const navigate = useNavigate();

  const adminMenu = [
    { name: '🛡️ Admin Dashboard', path: '/admin/dashboard' },
    { name: '📋 Manage Bookings', path: '/admin/bookings' },
  ];

  return (
    <div className="flex h-screen w-screen bg-[#F8FAFC] overflow-hidden">
      {/* Admin Specific Sidebar */}
      <aside className="w-64 bg-slate-950 text-slate-400 flex flex-col h-full border-r border-slate-900">
        <div className="p-6 text-white font-bold text-xl tracking-tight border-b border-slate-900 flex items-center gap-2">
          <span className="text-amber-500 text-2xl">🛡️</span> Admin Console
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {adminMenu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/10'
                    : 'hover:bg-slate-900 hover:text-white'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Quick Link back to the Student Side */}
        <div className="p-4 border-t border-slate-900">
          <button
            onClick={() => navigate('/user/dashboard')}
            className="w-full flex items-center px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-slate-900 text-blue-400 hover:bg-slate-800 transition-colors justify-center gap-1"
          >
            ⬅️ Student Side
          </button>
        </div>
      </aside>

      {/* Admin Content Area Container */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200/80 px-8 flex items-center justify-between">
          <div className="text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/60">
            Secure Admin Session
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <span>System Manager</span>
            <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs">
              AD
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}