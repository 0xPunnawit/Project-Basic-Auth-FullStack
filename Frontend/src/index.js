import React from 'react';  // แค่ React เท่านั้น
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './AuthContext';  // ใช้ AuthProvider ที่ถูกต้อง
import Dashboard from './Dashboard';
import Login from './Login';
import Register from './Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // ใช้ Router และ Routes สำหรับจัดการเส้นทาง


// index.js (เพิ่มเฉพาะส่วนนี้)
import AdminRoute from './admin/AdminRoute';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import ManageUsers from './admin/ManageUsers';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />  {/* หน้า Login */}
        <Route path="/register" element={<Register />} />  {/* หน้า Register */}
        <Route path="/dashboard" element={<Dashboard />} />  {/* หน้า Dashboard */}

        {/* ✅ โซน Admin ต้องผ่าน AdminRoute */}
        <Route path="/admin" element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<ManageUsers />} />
          </Route>
        </Route>


      </Routes>
    </AuthProvider>
  </Router>
);
