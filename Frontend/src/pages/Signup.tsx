import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MESSAGES from '../constants/messages';

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

    // ✅ Client-side validation using constants
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
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || MESSAGES.SIGNUP_FAILED);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Register</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Signup;
