// src/api/tmdb.ts
import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

export const searchMovies = async (query: string, page = 1) => {
  const res = await tmdb.get('/search/movie', {
    params: { query, page },
  });
  return res.data;
};

export const getMovieDetails = async (movieId: number) => {
  const res = await tmdb.get(`/movie/${movieId}`);
  return res.data;
};
