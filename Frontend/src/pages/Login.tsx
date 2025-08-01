import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MESSAGES from '../constants/messages';
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Link,
} from '@mui/material';

const Login = () => {
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
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || MESSAGES.LOGIN_FAILED);
    }
  };

  return (
    <Box
      maxWidth={400}
      mx="auto"
      mt={5}
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
    >
      <Typography variant="h4" component="h1">
        Film App
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <TextField
          type="email"
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          type="password"
          label="Password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Login
        </Button>
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </form>
      <Typography variant="body2" mt={2}>
        Don't have an account?{' '}
        <Link href="/signup" underline="hover">
          Sign up
        </Link>
      </Typography>
    </Box>
  );
};

export default Login;
