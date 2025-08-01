import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { getFavorites } from '../api/favorites';
import { getTokenPayload } from '../utils/auth';
import MovieCard from '../components/MovieCard';
import { Movie } from '../types/Movie';

const MyProfile = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const userEmail = getTokenPayload()?.email || 'Unknown';

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await getFavorites();
        if (Array.isArray(data)) {
          setFavorites(data);
        } else {
          console.error('Favorites response was not an array');
          setFavorites([]);
        }
      } catch (err) {
        console.error('Failed to load favorites:', err);
        setFavorites([]);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>My Profile</Typography>
      <Typography variant="body1" gutterBottom>Email: {userEmail}</Typography>

      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>My Favorite Movies</Typography>

      {favorites.length > 0 ? (
        <Grid container spacing={2} justifyContent="center">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => {}}
              isFavorite={true}
              onToggleFavorite={() => {}}
            />
          ))}
        </Grid>
      ) : (
        <Typography>No favorite movies yet.</Typography>
      )}
    </Box>
  );
};

export default MyProfile;
