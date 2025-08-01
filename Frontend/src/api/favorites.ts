// src/api/favorites.ts
import axios from 'axios';
import { Movie } from '../types/Movie';

const API_BASE = 'http://localhost:5000/api/favorites';

export const getFavorites = async (): Promise<Movie[]> => {
  const token = localStorage.getItem('token');
  const res = await axios.get(API_BASE, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const addFavorite = async (movie: Movie) => {
  const token = localStorage.getItem('token');

  const simplifiedMovie = {
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
  };

  await axios.post(API_BASE, simplifiedMovie, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const removeFavorite = async (movieId: number) => {
  const token = localStorage.getItem('token');
  await axios.delete(`${API_BASE}/${movieId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
