// admin/ManageUsers.jsx
import React, { useEffect, useMemo, useState } from 'react';
import {
  Box, Paper, Typography, TextField, IconButton, Tooltip,
  Table, TableHead, TableBody, TableRow, TableCell, TableContainer,
  Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack
} from '@mui/material';
import { Delete, Info, Refresh } from '@mui/icons-material';
import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const ManageUsers = () => {
  const [rows, setRows] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(true);

  const [openDetail, setOpenDetail] = useState(false);
  const [detail, setDetail] = useState(null);

  const token = localStorage.getItem('token');

  // ฟังก์ชันดึงข้อมูลผู้ใช้
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${backendUrl}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRows(res.data?.users ?? []);
    } catch (e) {
      console.error('Error fetching user list', e);
    } finally {
      setLoading(false);
    }
  };

  // ดึงข้อมูลผู้ใช้ตอนที่คอมโพเนนต์โหลด
  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ฟิลเตอร์ข้อมูลผู้ใช้ตามคำค้นหา
  const filtered = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(u =>
      (u.name || '').toLowerCase().includes(q) ||
      (u.email || '').toLowerCase().includes(q) ||
      (u.phone || '').toLowerCase().includes(q)
    );
  }, [rows, keyword]);

  // ฟังก์ชันแสดงรายละเอียดผู้ใช้
  const onView = async (id) => {
    try {
      const res = await axios.get(`${backendUrl}/api/admin/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDetail(res.data); // ตั้งค่า detail เป็นข้อมูลที่ดึงมา
      setOpenDetail(true);  // เปิด Dialog
    } catch (e) {
      setDetail(null);  // ถ้าดึงข้อมูลไม่สำเร็จ ให้เป็น null
      setOpenDetail(true);  // เปิด Dialog แสดงข้อผิดพลาด
      console.error('Error fetching user details:', e);
    }
  };

  // ฟังก์ชันลบผู้ใช้
  const onDelete = async (id) => {
    if (!window.confirm('ยืนยันการลบผู้ใช้นี้?')) return;
    try {
      await axios.delete(`${backendUrl}/api/admin/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRows(prev => prev.filter(r => r.id !== id));  // ลบผู้ใช้จากรายการ
    } catch (e) {
      alert('ลบไม่สำเร็จ');
    }
  };

  // ฟังก์ชัน Normalize Role
  const normalizeRole = (role) => {
    if (!role) return 'USER';
    const normalizedRole = String(role).toUpperCase();
    return normalizedRole.includes('ADMIN') ? 'ADMIN' : 'USER';
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>จัดการผู้ใช้</Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
          <TextField
            label="ค้นหาชื่อ/อีเมล/เบอร์"
            size="small"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Button variant="contained" startIcon={<Refresh />} onClick={fetchUsers}>
            รีเฟรช
          </Button>
        </Stack>
      </Paper>

      <Paper>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell width={180}>ID</TableCell>
                <TableCell>ชื่อ</TableCell>
                <TableCell>อีเมล</TableCell>
                <TableCell>เบอร์</TableCell>
                <TableCell>ที่อยู่</TableCell>
                <TableCell width={100} align="center">บทบาท</TableCell>
                <TableCell width={110} align="center">รายละเอียด</TableCell>
                <TableCell width={110} align="center">การกระทำ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!loading && filtered.map(u => {
                const userRole = normalizeRole(u.role);
                return (
                  <TableRow key={u.id} hover>
                    <TableCell>{u.id}</TableCell>
                    <TableCell>{u.name}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>{u.phone}</TableCell>
                    <TableCell>{u.address}</TableCell>
                    <TableCell align="center">{userRole}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="ดูรายละเอียด">
                        <IconButton size="small" onClick={() => onView(u.id)}>
                          <Info fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="center">
                      {userRole === 'USER' && (
                        <Tooltip title="ลบ">
                          <IconButton color="error" size="small" onClick={() => onDelete(u.id)}>
                            <Delete fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
              {!loading && filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} align="center">ไม่พบข้อมูล</TableCell>
                </TableRow>
              )}
              {loading && (
                <TableRow>
                  <TableCell colSpan={8} align="center">กำลังโหลด...</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Dialog แสดงรายละเอียดรายคน */}
      <Dialog open={openDetail} onClose={() => setOpenDetail(false)} fullWidth maxWidth="sm">
        <DialogTitle>รายละเอียดผู้ใช้</DialogTitle>
        <DialogContent dividers>
          {detail ? (
            <Box sx={{ display: 'grid', gridTemplateColumns: '140px 1fr', rowGap: 1 }}>
              <Typography color="text.secondary">ID</Typography><Typography>{detail.id}</Typography>
              <Typography color="text.secondary">ชื่อ</Typography><Typography>{detail.name}</Typography>
              <Typography color="text.secondary">อีเมล</Typography><Typography>{detail.email}</Typography>
              <Typography color="text.secondary">เบอร์</Typography><Typography>{detail.phone}</Typography>
              <Typography color="text.secondary">ที่อยู่</Typography><Typography>{detail.address}</Typography>
              <Typography color="text.secondary">บทบาท</Typography><Typography>{detail.role}</Typography>
            </Box>
          ) : (
            <Typography color="error">ไม่สามารถดึงรายละเอียดได้</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDetail(false)}>ปิด</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageUsers;
