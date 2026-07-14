import React from 'react';
import { useBookings } from '../context/BookingContext'; // Import context hook

export default function MyBookings() {
  // Read live updating arrays from the global context engine
  const { bookingsList } = useBookings(); 

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Main Container Card */}
      <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">My Bookings</h2>
          <p className="text-xs text-slate-400 mt-0.5">View and track all your active laboratory room reservations.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-400 tracking-wider border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Booking ID</th>
                <th className="px-6 py-4">Lab Room</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Time Window</th>
                <th className="px-6 py-4">Approval Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookingsList.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono font-medium text-slate-900">{item.id}</td>
                  <td className="px-6 py-4 text-slate-800 font-semibold">{item.lab}</td>
                  <td className="px-6 py-4 text-slate-500">{item.date}</td>
                  <td className="px-6 py-4 text-slate-500">{item.time}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                      item.status === 'Approved' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                        : 'bg-amber-50 text-amber-700 border border-amber-100'
                    }`}>
                      {item.status === 'Approved' ? '● Approved' : '● Pending'}
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