import React, { createContext, useContext, useEffect, useState } from 'react';

const BookingContext = createContext();

export function BookingProvider({ children }) {
  // Initialize with your original baseline mock data
 const [bookings, setBookings] = useState(() => {
    const savedBookings = localStorage.getItem('bookings');
    return savedBookings ? JSON.parse(savedBookings) : [
      // Fallback seed mock data matching your exact layout if storage is empty
      { id: 'BRK001', lab: 'Computer Lab 1', date: '2026-05-20', time: '09:00 AM - 11:00 AM', status: 'Approved' },
      { id: 'BRK002', lab: 'Network Lab', date: '2026-05-22', time: '01:00 PM - 03:00 PM', status: 'Approved' },
      { id: 'BRK003', lab: 'Software Lab', date: '2026-05-25', time: '09:00 AM - 11:00 AM', status: 'Pending' },
      { id: 'BRK004', lab: 'Computer Lab 1', date: '2026-05-20', time: '09:00 AM - 11:00 AM', status: 'Pending' },
      { id: 'BRK005', lab: 'Computer Lab 1', date: '2026-05-20', time: '09:00 AM - 11:00 AM', status: 'Pending' },
      { id: 'BRK006', lab: 'Network Lab', date: '2026-05-20', time: '09:00 AM - 11:00 AM', status: 'Pending' },
    ];
  });
useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]); // Using 'bookings' here, NOT bookingsList

  const addBooking = (newBooking) => {
    setBookings((prevBookings) => [newBooking, ...prevBookings]);
  };
  const updateBookingStatus = (identifier, newStatus) => {
  setBookings((prevBookings) =>
    prevBookings.map((b, idx) => {
      // Match by unique ID OR match by index if ID doesn't exist
      if (b.id === identifier || idx === identifier) {
        return { ...b, status: newStatus };
      }
      return b;
    })
  );
};
const clearBookings = () => {
    setBookings([]); // កំណត់ឱ្យទៅជាទទេស្អាត
  };

  return (
    // Make sure the value matches the exact state hook names
   <BookingContext.Provider value={{ bookings, addBooking, updateBookingStatus, clearBookings }}>
      {children}
    </BookingContext.Provider>
  );
}

export const useBookings = () => useContext(BookingContext);