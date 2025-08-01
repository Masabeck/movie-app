import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import User from '../models/User';
import logger from '../utils/logger';

const router = express.Router();

// GET /api/favorites - Get all favorites of the current user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById((req as any).user.id);
    res.json(user?.favorites || []);
  } catch (err) {
    logger.error('Failed to fetch favorites: ' + (err as Error).message);
    res.status(500).json({ message: 'Failed to fetch favorites' });
  }
});

// POST /api/favorites - Add a new favorite
router.post('/', authenticateToken, async (req, res) => {
  const newFavorite = req.body;

  try {
    const user = await User.findById((req as any).user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const exists = user.favorites.some((movie: any) => movie.id === newFavorite.id);
    if (exists) {
      return res.status(400).json({ message: 'Movie already in favorites' });
    }

    user.favorites.push(newFavorite);
    await user.save();

    res.status(201).json({ message: 'Favorite added successfully', favorites: user.favorites });
  } catch (err) {
    logger.error('Failed to add favorite: ' + (err as Error).message);
    res.status(500).json({ message: 'Failed to add favorite' });
  }
});

// DELETE /api/favorites/:id - Remove a favorite by TMDB movie ID
router.delete('/:id', authenticateToken, async (req, res) => {
  const movieId = parseInt(req.params.id);

  try {
    const user = await User.findById((req as any).user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.favorites.pull({ id: movieId });
    await user.save();

    res.json({ message: 'Favorite removed successfully', favorites: user.favorites });
  } catch (err) {
    logger.error('Failed to remove favorite: ' + (err as Error).message);
    res.status(500).json({ message: 'Failed to remove favorite' });
  }
});

export default router;
