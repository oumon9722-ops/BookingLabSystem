import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();

  // Mock macro statistics for the admin dashboard overview
  const cards = [
    { label: 'Pending Approvals', count: 3, styles: 'text-amber-600 border-l-4 border-amber-500' },
    { label: 'Approved Requests', count: 14, styles: 'text-emerald-600 border-l-4 border-emerald-500' },
    { label: 'Total Lab Slots Booked', count: 17, styles: 'text-blue-600 border-l-4 border-blue-500' },
    { label: 'Systems Status', count: '100%', styles: 'text-slate-700 border-l-4 border-slate-900' },
  ];

  // Overview of labs and current status
  const labStatusSummary = [
    { name: 'Computer Lab 1', utilization: '85%', standardTime: '09:00 AM - 05:00 PM', condition: 'Fully Operational' },
    { name: 'Network Lab', utilization: '60%', standardTime: '08:00 AM - 04:00 PM', condition: 'Fully Operational' },
    { name: 'Software Lab', utilization: '45%', standardTime: '09:00 AM - 06:00 PM', condition: 'Maintenance (2 Racks)' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Title & Quick Info Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Admin Dashboard</h1>
          <p className="text-sm text-slate-500">System metrics overview for all laboratory facility allocations.</p>
        </div>
        <button 
          onClick={() => navigate('/admin/bookings')}
          className="bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-amber-600/10 transition-transform active:scale-95"
        >
          Review Booking Queue
        </button>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, idx) => (
          <div key={idx} className={`bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm flex flex-col justify-between ${card.styles}`}>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{card.label}</span>
            <span className="text-3xl font-extrabold mt-2 tracking-tight">{card.count}</span>
          </div>
        ))}
      </div>

      {/* Facilities Status Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="font-bold text-slate-900 text-base">Laboratory Infrastructure Status</h2>
          <p className="text-xs text-slate-400 mt-0.5">Real-time resource environment diagnostics.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50/70 text-xs font-semibold uppercase text-slate-400 tracking-wider border-b border-slate-100">
              <tr>
                <th className="px-6 py-3.5">Lab Name</th>
                <th className="px-6 py-3.5">Daily Utilization</th>
                <th className="px-6 py-3.5">Available Window</th>
                <th className="px-6 py-3.5">Hardware Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {labStatusSummary.map((lab, idx) => (
                <tr key={idx} className="hover:bg-slate-50/30 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900">{lab.name}</td>
                  <td className="px-6 py-4 text-slate-700 font-medium">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full" style={{ width: lab.utilization }}></div>
                      </div>
                      <span>{lab.utilization}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-xs">{lab.standardTime}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                      lab.condition.startsWith('Fully') 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                        : 'bg-amber-50 text-amber-700 border border-amber-100'
                    }`}>
                      {lab.condition}
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