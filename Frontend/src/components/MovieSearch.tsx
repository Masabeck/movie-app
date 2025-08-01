import { useEffect, useState } from 'react';
import {
  Box, Button, CircularProgress, Grid,
  Tab, Tabs, TextField, Typography
} from '@mui/material';
import { searchMovies } from '../api/tmdb';
import { getFavorites, addFavorite, removeFavorite } from '../api/favorites';
import MESSAGES from '../constants/messages';
import MovieCard from './MovieCard';
import MovieModal from './MovieModal';
import { Movie } from '../types/Movie';

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'search' | 'favorites'>('search');

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await getFavorites();
        if (Array.isArray(data)) {
          setFavorites(data);
        } else {
            console.error(MESSAGES.FAVORITES_NOT_ARRAY);
            setFavorites([]);
            }
          } catch (err) {
          console.error(MESSAGES.FAVORITES_FETCH_FAILED, err);
      setFavorites([]);
    }
  };

  fetchFavorites();
}, []);


  const handleSearch = async () => {
    if (!query.trim()) {
      setError(MESSAGES.FILL_ALL_FIELDS);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await searchMovies(query);
      setMovies(data.results);
    } catch (err) {
      setError(MESSAGES.MOVIE_FETCH_FAILED);
    } finally {
      setLoading(false);
    }
  };

  const isFavorite = (movieId: number) =>
    Array.isArray(favorites) && favorites.some((fav) => fav.id === movieId);

  const toggleFavorite = async (movie: Movie) => {
    try {
      if (isFavorite(movie.id)) {
        await removeFavorite(movie.id);
        setFavorites((prev) =>
          Array.isArray(prev) ? prev.filter((fav) => fav.id !== movie.id) : []
        );
      } else {
        await addFavorite(movie);
        setFavorites((prev) =>
          Array.isArray(prev) ? [...prev, movie] : [movie]
        );
      }
    } catch (err) {
      console.error(MESSAGES.FAVORITE_TOGGLE_FAILED, err);
    }
  };

  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setIsModalOpen(false);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Movies
      </Typography>

      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
        sx={{ mb: 2 }}
      >
        <Tab label="Search" value="search" />
        <Tab label="Favorites" value="favorites" />
      </Tabs>

      {activeTab === 'search' && (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              label="Enter movie title"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button variant="contained" onClick={handleSearch}>
              Search
            </Button>
          </Box>

          {loading && <CircularProgress />}
          {error && <Typography color="error">{error}</Typography>}

          {Array.isArray(movies) && movies.length > 0 && (
            <Grid container justifyContent="center">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={() => openModal(movie)}
                  isFavorite={isFavorite(movie.id)}
                  onToggleFavorite={() => toggleFavorite(movie)}
                />
              ))}
            </Grid>
          )}
        </>
      )}

      {activeTab === 'favorites' && (
        <Grid container justifyContent="center">
          {Array.isArray(favorites) && favorites.length > 0 ? (
            favorites.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={() => openModal(movie)}
                isFavorite={true}
                onToggleFavorite={() => toggleFavorite(movie)}
              />
            ))
          ) : (
            <Typography>No favorite movies yet.</Typography>
          )}
        </Grid>
      )}

      <MovieModal isOpen={isModalOpen} onClose={closeModal} movie={selectedMovie} />
    </Box>
  );
};

export default MovieSearch;