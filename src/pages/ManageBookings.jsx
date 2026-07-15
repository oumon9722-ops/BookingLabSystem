import React from 'react';
import { useBookings } from '../context/BookingContext'; // 🔑 Import global shared context hook

export default function ManageBookings() {
  const { bookings, updateBookingStatus } = useBookings();

  return (
    <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm overflow-hidden m-6">
      <div className="px-6 py-4 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-900">Manage Bookings</h2>
        <p className="text-xs text-slate-400 mt-0.5">Approve or reject real-time student infrastructure booking claims.</p>
      </div>

      <div className="overflow-x-auto">
        {(!bookings || bookings.length === 0) ? (
          <div className="p-8 text-center text-slate-400 text-sm">No bookings in queue.</div>
        ) : (
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50/70 text-xs font-semibold uppercase text-slate-400 tracking-wider border-b border-slate-100">
              <tr>
                <th className="px-6 py-3.5">User</th>
                <th className="px-6 py-3.5">Lab</th>
                <th className="px-6 py-3.5">Schedule</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookings.map((row, idx) => {
                // Determine a visible fallback ID for the UI display
                const displayId = row.id || `BRK00${idx + 1}`;
                // ⚡ Target identifier prioritizing actual ID property, falling back to array index
                const targetKey = row.id ? row.id : idx;

                return (
                  <tr key={idx} className="hover:bg-slate-50/30 transition-colors">
                    {/* User Column */}
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-800">{row.user || 'Student Account'}</div>
                      <div className="text-xs text-slate-400 font-mono">{displayId}</div>
                    </td>
                    
                    {/* Lab Column */}
                    <td className="px-6 py-4 font-semibold text-slate-700">{row.lab || row.labRoom}</td>
                    
                    {/* Schedule Column */}
                    <td className="px-6 py-4">
                      <div className="text-slate-600 font-medium">{row.date}</div>
                      <div className="text-xs text-slate-400">{row.time || row.timeSlot}</div>
                    </td>
                    
                    {/* Status Badge Column */}
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                        row.status === 'Approved'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                          : row.status === 'Rejected'
                          ? 'bg-rose-50 text-rose-700 border border-rose-100'
                          : 'bg-amber-50 text-amber-700 border border-amber-100'
                      }`}>
                        {row.status || 'Pending'}
                      </span>
                    </td>
                    
                    {/* Actions Column */}
                    <td className="px-6 py-4 text-center space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => updateBookingStatus(targetKey, 'Approved')}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors shadow-sm"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateBookingStatus(targetKey, 'Rejected')}
                        className="bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 transition-all"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}