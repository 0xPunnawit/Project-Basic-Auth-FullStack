import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState(localStorage.getItem('token')); // ดึง token จาก localStorage
  const [timeLeft, setTimeLeft] = useState(0); // เวลา JWT ที่เหลือ
  const [intervalId, setIntervalId] = useState(null);

  const logout = useCallback(() => {
    setAuthToken(null);
    localStorage.removeItem('token');
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    if (authToken) {
      try {
        const decodedToken = jwtDecode(authToken);
        const expirationTime = decodedToken.exp * 1000; // แปลงเวลา expiration เป็น milliseconds
        const currentTime = Date.now();
        const timeRemaining = expirationTime - currentTime; // คำนวณเวลาที่เหลือ

        if (timeRemaining > 0) {
          setTimeLeft(timeRemaining);
          
          const interval = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1000); // ลดเวลาแต่ละวินาที
          }, 1000);
          
          setIntervalId(interval); // เก็บ intervalId เพื่อลบตอน unmount
        } else {
          logout();
        }
      } catch (error) {
        logout();
      }
    }

    return () => clearInterval(intervalId); // เมื่อ unmount, ลบ interval
  }, [authToken, logout, navigate, intervalId]);

  const login = (token) => {
    setAuthToken(token);
    localStorage.setItem('token', token); // เก็บ token ใน localStorage
    navigate('/dashboard');
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout, timeLeft }}>
      {children}
    </AuthContext.Provider>
  );
};
