import { useNavigate } from 'react-router-dom';
import MovieSearch from '../components/MovieSearch';
import { Box, Button, Typography, Divider } from '@mui/material';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Typography variant="h5">Welcome to the Dashboard</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" onClick={goToProfile}>
            My Profile
          </Button>
          <Button variant="contained" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      <MovieSearch />
    </Box>
  );
};

export default Dashboard;
