import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MESSAGES from '../constants/messages';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email: string): boolean => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError(MESSAGES.FILL_ALL_FIELDS);
      return;
    }

    if (!validateEmail(email)) {
      setError(MESSAGES.INVALID_EMAIL);
      return;
    }

    if (password.length < 6) {
      setError(MESSAGES.SHORT_PASSWORD);
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        email,
        password,
      });
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || MESSAGES.SIGNUP_FAILED);
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={5} p={3} boxShadow={3} borderRadius={2}>
      <Typography variant="h5" mb={2}>Sign Up</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          type="email"
          label="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          type="password"
          label="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Register
        </Button>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </form>
    </Box>
  );
};

export default Signup;
