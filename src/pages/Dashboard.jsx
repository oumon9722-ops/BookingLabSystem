import React from "react";
import { useNavigate } from "react-router-dom";
import { useBookings } from "../context/BookingContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { bookings } = useBookings();

  // ⚡ UPDATED: Case-insensitive and safe property counters
  const totalBookings = bookings?.length || 0;

  const pendingCount =
    bookings?.filter((b) => b.status && b.status.toLowerCase() === "pending")
      .length || 0;

  const approvedCount =
    bookings?.filter((b) => b.status && b.status.toLowerCase() === "approved")
      .length || 0;

  const rejectedCount =
    bookings?.filter((b) => b.status && b.status.toLowerCase() === "rejected")
      .length || 0;

  const metricCards = [
    {
      label: "Total Bookings",
      count: totalBookings,
      styles: "text-blue-600 border-t-4 border-t-blue-500",
    },
    {
      label: "Pending",
      count: pendingCount,
      styles: "text-amber-500 border-t-4 border-t-amber-500",
    },
    {
      label: "Approved",
      count: approvedCount,
      styles: "text-emerald-500 border-t-4 border-t-emerald-500",
    },
    {
      label: "Rejected",
      count: rejectedCount,
      styles: "text-rose-500 border-t-4 border-t-rose-500",
    },
  ];

  // Update table filter to safely match lowercase strings as well
  const upcomingReservations =
    bookings?.filter(
      (b) => !b.status || b.status.toLowerCase() !== "rejected",
    ) || [];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Upper Title Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-slate-500">
            Overview of your laboratory schedules.
          </p>
        </div>
        <button
          onClick={() => navigate("/user/choose-lab")}
          className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2.5 rounded-xl text-sm shadow-md shadow-blue-600/10 transition-transform active:scale-95"
        >
          + Book New Lab
        </button>
      </div>

      {/* Metric Info Rows */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map((card, idx) => (
          <div
            key={idx}
            className={`bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm flex flex-col justify-between ${card.styles}`}
          >
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {card.label}
            </span>
            <span className="text-3xl font-bold mt-2 tracking-tight">
              {card.count}
            </span>
          </div>
        ))}
      </div>

      {/* Main Table Content Panel */}
      <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-semibold text-slate-900">Upcoming Bookings</h2>
        </div>
        <div className="overflow-x-auto">
          {upcomingReservations.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">
              No upcoming lab reservations found. Click "+ Book New Lab" to get
              started!
            </div>
          ) : (
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
                {upcomingReservations.map((row, idx) => {
                 const currentStatus = row.status ? row.status.toLowerCase() : 'pending';
                  return (
                    <tr
                      key={idx}
                      className="hover:bg-slate-50/30 transition-colors"
                    >
                      <td className="px-6 py-4 font-mono font-medium text-slate-900">
                        {row.id || row.bookingId || `BRK00${idx + 1}`}
                      </td>
                      <td className="px-6 py-4 text-slate-700 font-semibold">
                        {row.lab || row.labRoom}
                      </td>
                      <td className="px-6 py-4 text-slate-500">{row.date}</td>
                      <td className="px-6 py-4 text-slate-500">
                        {row.time || row.timeWindow || row.timeSlot}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                            currentStatus === "approved"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                              : currentStatus === "rejected"
                                ? "bg-rose-50 text-rose-700 border border-rose-100"
                                : "bg-amber-50 text-amber-700 border border-amber-100"
                          }`}
                        >
                          {row.status || "Pending"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
