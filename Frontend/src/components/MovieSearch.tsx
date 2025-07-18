import { useState } from 'react';
import { searchMovies } from '../api/tmdb';
import MESSAGES from '../constants/messages';
import MovieCard from './MovieCard';
import MovieModal from './MovieModal';

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [selectedMovie, setSelectedMovie] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openModal = (movie: any) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setIsModalOpen(false);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Search Movies</h2>
      <input
        type="text"
        placeholder="Enter movie title"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: '0.5rem', width: '300px' }}
      />
      <button onClick={handleSearch} style={{ marginLeft: '0.5rem', padding: '0.5rem 1rem' }}>
        Search
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onClick={() => openModal(movie)} />
        ))}
      </div>

      <MovieModal isOpen={isModalOpen} onClose={closeModal} movie={selectedMovie} />
    </div>
  );
};

export default MovieSearch;
