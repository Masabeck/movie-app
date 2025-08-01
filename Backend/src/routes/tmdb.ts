// Backend/routes/tmdb.ts
import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY; // Make sure this exists in .env

// /api/tmdb/search?query=batman
router.get('/search', async (req, res) => {
  const { query, page = 1 } = req.query;

  try {
    const tmdbRes = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query,
        page,
      },
    });

    res.json(tmdbRes.data);
  } catch (err) {
    console.error('TMDB Search Error:', err);
    res.status(500).json({ message: 'Failed to fetch movies from TMDB.' });
  }
});

// ✅ NEW: /api/tmdb/movie/:id
router.get('/movie/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const tmdbRes = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
      },
    });

    res.json(tmdbRes.data);
  } catch (err) {
    console.error('TMDB Details Error:', err);
    res.status(500).json({ message: 'Failed to fetch movie details.' });
  }
});

export default router;
