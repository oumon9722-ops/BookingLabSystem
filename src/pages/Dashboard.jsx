import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  // Mock statistics data matching the metric cards on your flow map
  const metricCards = [
    { label: 'Total Bookings', count: 5, styles: 'text-blue-600 border-t-4 border-t-blue-500' },
    { label: 'Pending', count: 2, styles: 'text-amber-500 border-t-4 border-t-amber-500' },
    { label: 'Approved', count: 3, styles: 'text-emerald-500 border-t-4 border-t-emerald-500' },
    { label: 'Rejected', count: 0, styles: 'text-rose-500 border-t-4 border-t-rose-500' },
  ];

  const upcomingReservations = [
    { id: 'BRK001', lab: 'Computer Lab 1', date: '20 May 2026', time: '09:00 AM - 11:00 AM', status: 'Pending' },
    { id: 'BRK002', lab: 'Network Lab', date: '22 May 2026', time: '01:00 PM - 03:00 PM', status: 'Approved' },
    { id: 'BRK003', lab: 'Software Lab', date: '25 May 2026', time: '09:00 AM - 11:00 AM', status: 'Pending' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Upper Title Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-sm text-slate-500">Overview of your laboratory schedules.</p>
        </div>
        <button 
          onClick={() => navigate('/user/choose-lab')}
          className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2.5 rounded-xl text-sm shadow-md shadow-blue-600/10 transition-transform active:scale-95"
        >
          + Book New Lab
        </button>
      </div>

      {/* Metric Info Rows */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map((card, idx) => (
          <div key={idx} className={`bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm flex flex-col justify-between ${card.styles}`}>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{card.label}</span>
            <span className="text-3xl font-bold mt-2 tracking-tight">{card.count}</span>
          </div>
        ))}
      </div>

      {/* Main Table Content Panel */}
      <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-semibold text-slate-900">Upcoming Bookings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50/70 text-xs font-semibold uppercase text-slate-400 tracking-wider border-b border-slate-100">
              <tr>
                <th className="px-6 py-3.5">Booking ID</th>
                <th className="px-6 py-3.5">Lab Room</th>
                <th className="px-6 py-3.5">Date</th>
                <th className="px-6 py-3.5">Time Slot</th>
                <th className="px-6 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {upcomingReservations.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/30 transition-colors">
                  <td className="px-6 py-4 font-mono font-medium text-slate-900">{row.id}</td>
                  <td className="px-6 py-4 text-slate-700 font-semibold">{row.lab}</td>
                  <td className="px-6 py-4 text-slate-500">{row.date}</td>
                  <td className="px-6 py-4 text-slate-500">{row.time}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                      row.status === 'Approved' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                        : 'bg-amber-50 text-amber-700 border border-amber-100'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}