// src/components/MovieModal.tsx
import React from 'react';

interface MovieModalProps {
  isOpen: boolean;
  onClose: () => void;
  movie: any;
}

const MovieModal: React.FC<MovieModalProps> = ({ isOpen, onClose, movie }) => {
  if (!isOpen || !movie) return null;

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : 'https://via.placeholder.com/300x450?text=No+Image';

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 999
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '1rem',
        width: '90%',
        maxWidth: 400,
        borderRadius: 10,
        position: 'relative',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 0 20px rgba(0,0,0,0.3)',
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            border: 'none',
            background: 'transparent',
            fontSize: '1.2rem',
            cursor: 'pointer'
          }}
        >
          ❌
        </button>

        <img
          src={imageUrl}
          alt={movie.title}
          style={{
            width: '100%',
            maxHeight: 300,
            objectFit: 'cover',
            borderRadius: 6,
            marginBottom: '0.5rem'
          }}
        />

        <h2 style={{ margin: '0.5rem 0' }}>{movie.title}</h2>
        <p><strong>Release:</strong> {movie.release_date}</p>
        <p><strong>Rating:</strong> {movie.vote_average}</p>
        <p style={{ fontSize: '0.9rem', color: '#444' }}>{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieModal;
