import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import UserLayout from '../layouts/UserLayout';
import AdminLayout from '../layouts/AdminLayout';

// Pages
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import ChooseLab from '../pages/ChooseLab';
import BookingForm from '../pages/BookingForm';
import MyBookings from '../pages/MyBookings';
import Profile from '../pages/Profile';
import AdminDashboard from '../pages/AdminDahboard'; // Matching your typo file name
import AdminBookings from '../pages/Adminbookings';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Authentication Route */}
        <Route path="/login" element={<Login />} />

        {/* Student/User Panel Routes wrapped in UserLayout */}
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="choose-lab" element={<ChooseLab />} />
          <Route path="book" element={<BookingForm />} />
          <Route path="my-bookings" element={<MyBookings />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Administrator Panel Routes wrapped in AdminLayout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="bookings" element={<AdminBookings />} />
        </Route>

        {/* Fallback Redirects */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}