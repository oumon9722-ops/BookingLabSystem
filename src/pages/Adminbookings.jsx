import React, { useState } from 'react';
import { useBookings } from '../context/BookingContext';

export default function AdminBookings() {
const { bookings, updateBookingStatus, clearBookings } = useBookings();
const handleClearAll = () => {
    if (window.confirm("Are you sure wan to  delete ?")) {
    clearBookings();           
    }
  };
  return (
    <div className="space-y-6">
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
              {/* 🔑 ៣. ប្តូរពី queue.map មកជា bookings.map វិញ */}
              {bookings.map((row, idx) => {
                // ប្រសិនបើកូដកក់ថ្មីគ្មាន ID ទេ វានឹងបង្កើត ID លេខរៀងឱ្យស្វ័យប្រវត្ត
                const displayId = row.id || `BRK00${idx + 1}`;
                
                return (
                  <tr key={row.id || idx} className="hover:bg-slate-50/40 transition-colors">
                    <td className="px-6 py-4">
                      {/* 🔑 បង្ហាញឈ្មោះ User (បើគ្មានទេ ដាក់ឈ្មោះលំនាំដើម) */}
                      <div className="font-semibold text-slate-900">{row.user || 'Student Account'}</div>
                      <div className="text-[11px] font-mono text-slate-400">{displayId}</div>
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
                        {row.status || 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center space-x-2">
                      {row.status === 'Pending' || !row.status ? (
                        <>
                          {/* 🔑 ៤. កែប៊ូតុងចុចឱ្យទៅហៅអនុគមន៍ updateBookingStatus ពី Context វិញ */}
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
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}