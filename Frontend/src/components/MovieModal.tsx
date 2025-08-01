// src/components/MovieModal.tsx
import React from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Movie } from '../types/Movie';
import { IMAGE_BASE_URL, FALLBACKS } from '../constants/tmdb';

interface MovieModalProps {
  isOpen: boolean;
  onClose: () => void;
  movie: Movie | null;
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
  maxHeight: '90vh',
  overflowY: 'auto',
};

const MovieModal: React.FC<MovieModalProps> = ({ isOpen, onClose, movie }) => {
  if (!isOpen || !movie) return null;

  const imageUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}w300${movie.poster_path}`
    : FALLBACKS.modalPoster;

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
          <CloseIcon />
        </IconButton>

        <img
          src={imageUrl}
          alt={movie.title}
          style={{ width: '100%', borderRadius: 6, marginBottom: '1rem' }}
        />

        <Typography variant="h5" gutterBottom>
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Release:</strong> {movie.release_date}
        </Typography>
        <Typography variant="body2" color="warning.main">
          <strong>Rating:</strong> {movie.vote_average}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          {movie.overview}
        </Typography>
      </Box>
    </Modal>
  );
};

export default MovieModal;