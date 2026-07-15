import React from "react";
import { useBookings } from "../context/BookingContext"; // Import context hook

export default function MyBookings() {
  // Read live updating arrays from the global context engine
  const { bookings } = useBookings();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Main Container Card */}
      <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">My Bookings</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            View and track all your active laboratory room reservations.
          </p>
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
              {bookings &&
                bookings.map(
                  (
                    row,
                    idx, // 🔑 Change 'bookingsList.map' to 'bookings.map'
                  ) => (
                    <tr
                      key={idx}
                      className="hover:bg-slate-50/30 transition-colors"
                    >
                      <td className="px-6 py-4 font-mono font-medium text-slate-900">
                        {row.id || `BRK00${idx + 1}`}
                      </td>
                      <td className="px-6 py-4 text-slate-700 font-semibold">
                        {row.lab}
                      </td>
                      <td className="px-6 py-4 text-slate-500">{row.date}</td>
                      <td className="px-6 py-4 text-slate-500">{row.time}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                            row.status === "Approved"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                              : "bg-amber-50 text-amber-700 border border-amber-100"
                          }`}
                        >
                          {row.status || "Pending"}
                        </span>
                      </td>
                    </tr>
                  ),
                )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
