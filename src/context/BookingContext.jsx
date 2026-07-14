import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export function BookingProvider({ children }) {
  // Initialize with your original baseline mock data
  const [bookingsList, setBookingsList] = useState([
    { id: 'BRK001', lab: 'Computer Lab 1', date: '2026-05-20', time: '09:00 AM - 11:00 AM', status: 'Approved' },
    { id: 'BRK002', lab: 'Network Lab', date: '2026-05-22', time: '01:00 PM - 03:00 PM', status: 'Approved' },
    { id: 'BRK003', lab: 'Software Lab', date: '2026-05-25', time: '09:00 AM - 11:00 AM', status: 'Pending' }
  ]);

  // Function to insert a freshly submitted form into the global queue
  const addBooking = (newBooking) => {
    setBookingsList((prev) => [
      {
        id: `BRK00${prev.length + 1}`, // Auto-incrementing IDs
        status: 'Pending',             // Default fallback state
        ...newBooking
      },
      ...prev // Puts the newest reservation at the very top of the list
    ]);
  };

  return (
    <BookingContext.Provider value={{ bookingsList, addBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export const useBookings = () => useContext(BookingContext);