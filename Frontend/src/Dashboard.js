import React, { useState, useEffect } from 'react';
import { Typography, Button, Box, Container, Modal, TextField, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Dashboard() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({}); // State for form errors
  const [alertMessage, setAlertMessage] = useState(null); // State for alert message
  const [alertSeverity, setAlertSeverity] = useState("error"); // Severity for alert

  const authToken = localStorage.getItem('token');

  useEffect(() => {
    if (authToken) {
      const decodedToken = jwtDecode(authToken);
      const expirationTime = decodedToken.exp * 1000;
      const currentTime = Date.now();
      const timeRemaining = expirationTime - currentTime;

      if (timeRemaining > 0) {
        setTimeLeft(timeRemaining);

        const interval = setInterval(() => {
          setTimeLeft((prevTime) => prevTime - 1000);
        }, 1000);
        setIntervalId(interval);
      } else {
        localStorage.removeItem('token');
        navigate('/');
      }
    } else {
      navigate('/');
    }

    return () => clearInterval(intervalId);
  }, [authToken, intervalId, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/'); // Directly navigate to login
  };

  const handleProfileOpen = () => {
    axios
      .get(`${backendUrl}/api/user/profile`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        setProfile(response.data);
        setName(response.data.name);
        setPhone(response.data.phone);
        setAddress(response.data.address);
        setOpenProfile(true); // Show profile modal
      })
      .catch((error) => {
        console.error('Error fetching profile:', error);
      });
  };

  const handleCloseProfile = () => {
    setOpenProfile(false);
  };

  const handleEditOpen = () => {
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const handleEditSubmit = () => {
    const updatedProfile = { name, phone, address };

    axios
      .put(`${backendUrl}/api/user/profile`, updatedProfile, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        setProfile(response.data);
        setOpenEdit(false);  // Close edit modal after successful update
        setAlertMessage("Profile updated successfully!");
        setAlertSeverity("success");
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          // Handle error messages from backend and display in UI
          const errorMessages = error.response.data.message || {};
          setErrors({
            name: errorMessages.name || '',
            phone: errorMessages.phone || '',
            address: errorMessages.address || '',
          });
          setAlertMessage("There was an error updating your profile.");
          setAlertSeverity("error");
        }
        console.error('Error updating profile:', error);
      });
  };

  return (
    <Container>
      <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          Welcome! You are logged in.
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Time left before JWT expires:
        </Typography>
        <Typography variant="h5" sx={{ color: '#d32f2f', fontWeight: 'bold', marginBottom: 3 }}>
          {Math.floor(timeLeft / 60000)} minutes {Math.floor((timeLeft % 60000) / 1000)} seconds
        </Typography>

        {/* Alert message if any error */}
        {alertMessage && (
          <Alert severity={alertSeverity} sx={{ marginBottom: 2 }}>
            {alertMessage}
          </Alert>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', marginBottom: 3 }}>
          <Button variant="contained" color="primary" onClick={handleProfileOpen}>
            View Profile
          </Button>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Box>

        <Button variant="outlined" color="info" onClick={handleEditOpen}>
          Edit Profile
        </Button>

        {/* Profile Modal */}
        <Modal open={openProfile} onClose={handleCloseProfile}>
          <Box sx={{ padding: 4, backgroundColor: '#fff', margin: 'auto', maxWidth: 400, marginTop: '10%' }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              User Profile
            </Typography>
            {profile ? (
              <>
                <Typography variant="body1">Name: {profile.name}</Typography>
                <Typography variant="body1">Email: {profile.email}</Typography>
                <Typography variant="body1">Phone: {profile.phone}</Typography>
                <Typography variant="body1">Address: {profile.address}</Typography>
                <Typography variant="body1">Role: {profile.role}</Typography>
              </>
            ) : (
              <Typography variant="body2" color="error">
                Failed to load profile.
              </Typography>
            )}
            <Button onClick={handleCloseProfile} sx={{ marginTop: 2 }}>
              Close
            </Button>
          </Box>
        </Modal>

        {/* Edit Profile Modal (Card-like Form) */}
        <Modal open={openEdit} onClose={handleEditClose}>
          <Box sx={{ padding: 4, backgroundColor: '#fff', margin: 'auto', maxWidth: 400, marginTop: '10%' }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Edit Profile
            </Typography>
            <TextField
              label="Name"
              fullWidth
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ marginBottom: 2 }}
              error={!!errors.name} // Show error if name is invalid
              helperText={errors.name} // Show error message for name
            />
            <TextField
              label="Phone"
              fullWidth
              variant="outlined"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              sx={{ marginBottom: 2 }}
              error={!!errors.phone} // Show error if phone is invalid
              helperText={errors.phone} // Show error message for phone
            />
            <TextField
              label="Address"
              fullWidth
              variant="outlined"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              sx={{ marginBottom: 3 }}
              error={!!errors.address} // Show error if address is invalid
              helperText={errors.address} // Show error message for address
            />
            <Button variant="contained" color="primary" onClick={handleEditSubmit} sx={{ marginBottom: 2 }}>
              Save Changes
            </Button>
            <Button onClick={handleEditClose}>Cancel</Button>
          </Box>
        </Modal>
      </Box>
    </Container>
  );
}

export default Dashboard;
