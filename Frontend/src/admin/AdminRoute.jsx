// admin/AdminRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AdminRoute = () => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/" replace />;

  try {
    const decoded = jwtDecode(token);

    // รองรับทั้ง role เดี่ยว และ roles เป็นอาเรย์
    const role = decoded.role || decoded.roles || decoded.authorities || decoded.scope;
    const isAdmin = Array.isArray(role) ? role.includes('ADMIN') : role === 'ADMIN' || String(role).includes('ADMIN');

    if (!isAdmin) return <Navigate to="/dashboard" replace />;
    return <Outlet />;
  } catch {
    return <Navigate to="/" replace />;
  }
};

export default AdminRoute;
