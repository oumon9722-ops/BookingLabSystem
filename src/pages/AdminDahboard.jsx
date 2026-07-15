import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookings } from '../context/BookingContext'; // 🔑 Connect to global state engine

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { bookings } = useBookings(); // Pull shared data array

  // ⚡ DYNAMIC COUNTERS: Compute real metrics instantly
  const pendingApprovals = bookings?.filter(b => 
    b.status && b.status.toLowerCase() === 'pending'
  ).length || 0;

  const approvedRequests = bookings?.filter(b => 
    b.status && b.status.toLowerCase() === 'approved'
  ).length || 0;

  const totalSlotsBooked = bookings?.length || 0;

  return (
    <div className="flex h-screen bg-slate-50">
      {/* ... Left Sidebar Navigation Layout ... */}
      
      {/* Main Panel View Area */}
      <div className="flex-1 p-8 overflow-y-auto space-y-6">
        
        {/* Header Block */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Admin Dashboard</h1>
            <p className="text-sm text-slate-500">System metrics overview for all laboratory facility allocations.</p>
          </div>
          <button 
            onClick={() => navigate('/admin/bookings')} // Or your respective review route
            className="bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md transition-colors"
          >
            Review Booking Queue
          </button>
        </div>

        {/* 📊 Metric Info Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Pending Approvals Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Pending Approvals</span>
            <span className="text-4xl font-black text-amber-500 mt-2 block tracking-tight">{pendingApprovals}</span>
          </div>

          {/* Approved Requests Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Approved Requests</span>
            <span className="text-4xl font-black text-emerald-500 mt-2 block tracking-tight">{approvedRequests}</span>
          </div>

          {/* Total Slots Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Lab Slots Booked</span>
            <span className="text-4xl font-black text-blue-600 mt-2 block tracking-tight">{totalSlotsBooked}</span>
          </div>

          {/* Systems Status Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-900 shadow-sm border-t-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Systems Status</span>
            <span className="text-4xl font-black text-slate-800 mt-2 block tracking-tight">100%</span>
          </div>

        </div>

        {/* ... Rest of your Laboratory Infrastructure Status Table View component layout ... */}

      </div>
    </div>
  );
}