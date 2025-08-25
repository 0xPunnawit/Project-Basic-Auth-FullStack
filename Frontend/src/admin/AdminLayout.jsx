// admin/AdminLayout.jsx
import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Drawer, List, ListItemButton, ListItemText, Box, Button } from '@mui/material';
import { jwtDecode } from 'jwt-decode';

const drawerWidth = 220;

const AdminLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState(0); // สถานะเวลาที่เหลือ
  const [expired, setExpired] = useState(false); // เช็คว่า token หมดอายุหรือยัง

  // ตรวจสอบ JWT ทุกครั้งที่หน้า AdminLayout โหลด
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setExpired(true); // ถ้าไม่มี token
      navigate('/'); // พาไปหน้า login
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const expirationTime = decoded.exp * 1000; // exp คือเวลาหมดอายุในวินาที
      const currentTime = Date.now();
      const timeRemaining = expirationTime - currentTime;

      if (timeRemaining <= 0) {
        setExpired(true); // ถ้าเวลาหมดอายุ
        localStorage.removeItem('token'); // ลบ token
        navigate('/'); // พาไปหน้า login
      } else {
        setTimeLeft(timeRemaining / 1000); // คำนวณเป็นวินาที
        const interval = setInterval(() => {
          const remaining = expirationTime - Date.now();
          if (remaining <= 0) {
            setExpired(true); // ถ้าหมดอายุ
            clearInterval(interval);
            localStorage.removeItem('token'); // ลบ token
            navigate('/'); // พาไปหน้า login
          } else {
            setTimeLeft(remaining / 1000); // คำนวณเป็นวินาที
          }
        }, 1000); // อัพเดตทุกๆ 1 วินาที

        return () => clearInterval(interval); // เมื่อ unmount ให้เคลียร์ interval
      }
    } catch (error) {
      setExpired(true); // ถ้าไม่สามารถ decode token ได้
      localStorage.removeItem('token'); // ลบ token
      navigate('/'); // พาไปหน้า login
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/'); // พาไปหน้า login
  };

  const items = [
    { to: '/admin', label: 'แดชบอร์ด' },
    { to: '/admin/users', label: 'จัดการผู้ใช้' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Admin Console</Typography>
          
          {/* แสดงเวลาที่เหลือในวินาที */}
          {!expired && (
            <Typography variant="body1" color="inherit" sx={{ marginRight: 2 }}>
              Token expires in: {Math.floor(timeLeft)} seconds
            </Typography>
          )}

          <Button color="inherit" onClick={logout}>Logout</Button>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <List>
          {items.map((it) => (
            <ListItemButton
              key={it.to}
              component={Link}
              to={it.to}
              selected={pathname === it.to}
            >
              <ListItemText primary={it.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
