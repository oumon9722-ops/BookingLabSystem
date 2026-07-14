import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const menuItems = [
    { name: '📊 Dashboard', path: '/user/dashboard' },
    { name: '💻 Choose Lab', path: '/user/choose-lab' },
    { name: '📅 My Bookings', path: '/user/my-bookings' },
    { name: '👤 Profile', path: '/user/profile' },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-400 flex flex-col h-full border-r border-slate-800">
      {/* Platform Title Header */}
      <div className="p-6 text-white font-bold text-xl tracking-tight border-b border-slate-800 flex items-center gap-2">
        <span className="text-blue-500 text-2xl">⚡</span> Lab Booking
      </div>

      {/* Main Link Menus */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/10'
                  : 'hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Footer / Switch View Admin Actions */}
      <div className="p-4 border-t border-slate-800">
        <NavLink
          to="/admin/dashboard"
          className="w-full flex items-center px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-slate-800 text-amber-400 hover:bg-slate-700/80 transition-colors text-center justify-center"
        >
          🛡️ Admin Panel
        </NavLink>
      </div>
    </aside>
  );
}