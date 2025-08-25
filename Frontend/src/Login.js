// Login.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Container, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';   // ✅ import jwtDecode

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [userCount, setUserCount] = useState(null);

  useEffect(() => {
    axios
      .get(`${backendUrl}/api/auth/count`)
      .then((response) => {
        setUserCount(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user count', error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = { email, password };

    axios
      .post(`${backendUrl}/api/auth/login`, userData)
      .then((response) => {
        const token = response.data;
        localStorage.setItem('token', token);

        try {
          const decoded = jwtDecode(token);
          const role = decoded.role || decoded.roles || decoded.authorities || decoded.scope;

          const isAdmin = Array.isArray(role)
            ? role.includes('ADMIN') || role.includes('ROLE_ADMIN')
            : role === 'ADMIN' || role === 'ROLE_ADMIN' || String(role).includes('ADMIN');

          if (isAdmin) {
            navigate('/admin');   // ✅ ถ้าเป็น admin ไปหน้า admin ทันที
          } else {
            navigate('/dashboard'); // ถ้าไม่ใช่ admin ไปหน้า dashboard
          }
        } catch (err) {
          console.error('JWT decode error', err);
          navigate('/dashboard');
        }
      })
      .catch((error) => {
        setAuthError('Invalid email or password');
        console.error('Error logging in', error);
      });
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 3 }}>
        <Typography variant="h4" align="center">Login</Typography>
        {authError && <Typography color="error" variant="body2" align="center">{authError}</Typography>}

        {userCount !== null && (
          <Card sx={{ marginBottom: 3, backgroundColor: '#f5f5f5' }}>
            <CardContent>
              <Typography variant="h6" align="center" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                บัญชีทั้งหมดในระบบ
              </Typography>
              <Typography variant="h4" align="center" sx={{ marginTop: 1, color: '#388e3c' }}>
                {userCount} บัญชี
              </Typography>
            </CardContent>
          </Card>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ marginBottom: 2 }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>

        <Button variant="outlined" color="secondary" fullWidth onClick={handleRegister} sx={{ marginTop: 2 }}>
          Register
        </Button>
      </Box>
    </Container>
  );
}

export default Login;
