import React, { useState } from 'react';

export default function AdminBookings() {
  const [queue, setQueue] = useState([
    { id: 'BRK001', user: 'Student Account', lab: 'Computer Lab 1', date: '20 May 2026', time: '09:00 AM - 11:00 AM', status: 'Pending' },
    { id: 'BRK004', user: 'John Doe', lab: 'Network Lab', date: '21 May 2026', time: '01:00 PM - 03:00 PM', status: 'Pending' },
    { id: 'BRK005', user: 'Jane Smith', lab: 'Software Lab', date: '23 May 2026', time: '09:00 AM - 11:00 AM', status: 'Pending' }
  ]);

  const handleAction = (id, newStatus) => {
    setQueue(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Manage Bookings</h1>
        <p className="text-sm text-slate-500">Approve or reject real-time student infrastructure booking claims.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-400 tracking-wider border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Lab</th>
                <th className="px-6 py-4">Schedule</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {queue.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900">{row.user}</div>
                    <div className="text-[11px] font-mono text-slate-400">{row.id}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-700 font-medium">{row.lab}</td>
                  <td className="px-6 py-4 text-slate-500 text-xs">{row.date} <br/> {row.time}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                      row.status === 'Approved' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                        : row.status === 'Rejected'
                        ? 'bg-rose-50 text-rose-700 border border-rose-100'
                        : 'bg-amber-50 text-amber-700 border border-amber-100'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center space-x-2">
                    {row.status === 'Pending' ? (
                      <>
                        <button 
                          onClick={() => handleAction(row.id, 'Approved')} 
                          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors shadow-sm"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => handleAction(row.id, 'Rejected')} 
                          className="bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="text-xs text-slate-400 italic">Processed</span>
                    )}
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