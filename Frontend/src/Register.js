import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = { name, email, password, phone, address };

    axios
      .post(`${backendUrl}/api/auth/register`, userData)
      .then((response) => {
        alert("Registration successful");
        navigate("/"); // หลังจากสมัครเสร็จจะไปที่หน้า Login
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          // Make sure errorMessages is an array
          setErrorMessages(
            Array.isArray(error.response.data.message)
              ? error.response.data.message
              : [error.response.data.message]
          );
        } else {
          setErrorMessages(["An error occurred. Please try again."]);
        }
      });
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: 3,
          backgroundColor: "white",
          boxShadow: 2,
        }}
      >
        <Typography variant="h4" align="center" sx={{ marginBottom: 2 }}>
          Register
        </Typography>

        {/* Show error messages */}
        {errorMessages.length > 0 && (
          <Box sx={{ marginBottom: 2 }}>
            {errorMessages.map((msg, idx) => (
              <Typography
                key={idx}
                color="error"
                variant="body2"
                align="center"
              >
                {msg}
              </Typography>
            ))}
          </Box>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            sx={{ marginBottom: 2 }}
          />
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
          <TextField
            label="Phone"
            fullWidth
            variant="outlined"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            inputProps={{ maxLength: 10 }} // Limit input to 10 digits
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Address"
            fullWidth
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            sx={{ marginBottom: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginBottom: 2 }}
          >
            Register
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => navigate("/")}
            sx={{
              marginBottom: 2,
              padding: "2px 20px",
              fontSize: "16px",
              borderRadius: "8px",
              fontWeight: "600",
              backgroundColor: "rgba(255, 0, 0, 0.1)", // ใส่พื้นหลังเล็กน้อย
              "&:hover": {
                backgroundColor: "rgba(255, 0, 0, 0.2)", // เปลี่ยนสีเมื่อ hover
                borderColor: "#d32f2f", // สีของ border เมื่อ hover
              },
            }}
          >
            Back to Login
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Register;
