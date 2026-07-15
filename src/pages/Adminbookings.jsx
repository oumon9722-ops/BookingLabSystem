import React from 'react';
import { useBookings } from '../context/BookingContext';

export default function AdminBookings() {
  const { bookings, updateBookingStatus, clearBookings } = useBookings();

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to delete all bookings?")) {
      clearBookings();           
    }
  };

  return (
    <div className="space-y-6">
      {/* 🔑 រក្សាទុកតែប្លុកចំណងជើង និងប៊ូតុង Clear ខាងលើនេះបានហើយ (លុបអាជាន់គ្នាចេញ) */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Manage Bookings</h1>
          <p className="text-sm text-slate-500">Approve or reject real-time student infrastructure booking claims.</p>
        </div>
        <button 
          onClick={handleClearAll}
          className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors shadow-sm"
        >
          🗑️ Clear All Data
        </button>
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
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-slate-400 italic">
                    No bookings found.
                  </td>
                </tr>
              ) : (
                bookings.map((row, idx) => {
                  const displayId = row.id || `BRK00${idx + 1}`;
                  
                  return (
                    <tr key={row.id || idx} className="hover:bg-slate-50/40 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900">{row.user || 'Student Account'}</div>
                        <div className="text-[11px] font-mono text-slate-400">{displayId}</div>
                      </td>
                      
                      {/* 🔑 កន្លែងបង្ហាញ Lab និង Purpose */}
                      <td className="px-6 py-4">
                        <div className="text-slate-700 font-medium">{row.lab}</div>
                        {/* បង្ហាញ Purpose បើសិនជាសិស្សបានសរសេរមក */}
                        {row.purpose && (
                          <div className="text-[11px] text-slate-400 mt-1 italic bg-slate-50 px-2 py-0.5 rounded border border-slate-100 w-fit">
                            🎯 Purpose: {row.purpose}
                          </div>
                        )}
                      </td>

                      <td className="px-6 py-4 text-slate-500 text-xs">{row.date} <br/> {row.time}</td>
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
                      <td className="px-6 py-4 text-center space-x-2">
                        {row.status === 'Pending' || !row.status ? (
                          <>
                            <button 
                              onClick={() => updateBookingStatus(row.id || idx, 'Approved')} 
                              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors shadow-sm"
                            >
                              Approve
                            </button>
                            <button 
                              onClick={() => updateBookingStatus(row.id || idx, 'Rejected')} 
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
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}