import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useBookings } from '../context/BookingContext'; // Import context hook

export default function BookingForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addBooking } = useBookings(); // Connect form dispatch
  
  const activeLab = location.state?.selectedLab || 'Computer Lab 1';

  const [date, setDate] = useState('2026-05-20');
  const [time, setTime] = useState('09:00 AM - 11:00 AM');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Pack the dynamic UI form input values
    const newReservation = {
      lab: activeLab,
      date: date,
      time: time
    };

    // 2. Save it to our state engine
    addBooking(newReservation);

    // 3. Jump smoothly to the listing grid 
    navigate('/user/my-bookings');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Confirm Booking Details</h2>
          <p className="text-xs text-slate-400 mt-1">Target Room: <span className="font-semibold text-blue-600">{activeLab}</span></p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-500 block mb-1">Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full border border-slate-200 px-4 py-2.5 rounded-xl text-sm" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 block mb-1">Time Slot</label>
              <select value={time} onChange={(e) => setTime(e.target.value)} className="w-full border border-slate-200 px-4 py-2.5 rounded-xl text-sm bg-white">
                <option>09:00 AM - 11:00 AM</option>
                <option>11:00 AM - 01:00 PM</option>
                <option>01:00 PM - 03:00 PM</option>
              </select>
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-3 rounded-xl transition-colors">
            Confirm & Save Booking
          </button>
        </form>
      </div>
    </div>
  );
}