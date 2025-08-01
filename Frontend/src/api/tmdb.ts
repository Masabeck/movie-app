// Frontend/src/api/tmdb.ts
import axios from 'axios';

export const searchMovies = async (query: string) => {
  const res = await axios.get(`http://localhost:5000/api/tmdb/search`, {
    params: { query },
  });
  return res.data;
};

// ✅ New function to get movie details
export const getMovieDetails = async (id: number | string) => {
  const res = await axios.get(`http://localhost:5000/api/tmdb/movie/${id}`);
  return res.data;
};
