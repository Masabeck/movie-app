import { useNavigate } from 'react-router-dom';
import MovieSearch from '../components/MovieSearch';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Welcome to the Dashboard</h2>
        <button onClick={handleLogout} style={{ padding: '0.5rem 1rem' }}>
          Logout
        </button>
      </div>

      <hr style={{ margin: '1rem 0' }} />

      <MovieSearch />
    </div>
  );
};

export default Dashboard;
