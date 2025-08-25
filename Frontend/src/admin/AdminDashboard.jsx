// admin/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const StatCard = ({ title, value, sub }) => (
  <Paper elevation={2} sx={{ p: 2 }}>
    <Typography variant="overline" color="text.secondary">{title}</Typography>
    <Typography variant="h4" sx={{ mt: 1 }}>{value}</Typography>
    {sub ? (
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
        {sub}
      </Typography>
    ) : null}
  </Paper>
);

const normalizeRole = (r) => {
  if (!r) return 'USER';
  const s = String(r).toUpperCase();
  if (s.includes('ADMIN')) return 'ADMIN';
  return 'USER';
};

const AdminDashboard = () => {
  const [stats, setStats] = useState({ total: 0, admins: 0, users: 0 });
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!backendUrl) {
      setError('ENV REACT_APP_BACKEND_URL ไม่ถูกตั้งค่า');
      return;
    }
    if (!token) {
      setError('ไม่พบโทเคน กรุณาเข้าสู่ระบบใหม่');
      return;
    }

    let canceled = false;
    (async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/admin/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (canceled) return;

        const list = res.data?.users ?? [];
        const counts = list.reduce(
          (acc, u) => {
            const role = normalizeRole(u.role);
            if (role === 'ADMIN') acc.admins += 1;
            else acc.users += 1;
            acc.total += 1;
            return acc;
          },
          { total: 0, admins: 0, users: 0 }
        );
        setStats(counts);
        setError('');
      } catch (e) {
        setError('ดึงข้อมูลไม่สำเร็จ');
      }
    })();

    return () => { canceled = true; };
  }, []);

  const adminPct = stats.total ? Math.round((stats.admins / stats.total) * 100) : 0;
  const userPct  = stats.total ? Math.round((stats.users  / stats.total) * 100) : 0;

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>สรุประบบ</Typography>

      {error ? (
        <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>
      ) : null}

      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <StatCard title="ผู้ใช้ทั้งหมด" value={stats.total} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard title="ADMIN" value={stats.admins} sub={`${adminPct}%`} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard title="USER" value={stats.users} sub={`${userPct}%`} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
