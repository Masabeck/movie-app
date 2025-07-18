import React from 'react';

interface MovieCardProps {
  movie: any;
  onClick: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const {
    title,
    release_date,
    poster_path,
    vote_average,
    overview
  } = movie;

  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w200${poster_path}`
    : 'https://via.placeholder.com/200x300?text=No+Image';

  return (
    <div
      onClick={onClick}
      style={{
        width: 200,
        margin: '1rem',
        textAlign: 'center',
        border: '1px solid #ddd',
        borderRadius: 8,
        padding: '0.5rem',
        backgroundColor: '#f9f9f9',
        cursor: 'pointer'
      }}
    >
      <img
        src={imageUrl}
        alt={title}
        style={{ width: '100%', borderRadius: 4 }}
      />
      <h4>{title}</h4>
      <p style={{ color: '#777', margin: '0.2rem' }}>{release_date?.slice(0, 4) || 'N/A'}</p>
      <p style={{ color: '#ff9800', margin: '0.2rem' }}>★ {vote_average?.toFixed(1)}</p>
      <p style={{ fontSize: '0.8rem', color: '#333' }}>
        {overview?.length > 80 ? overview.slice(0, 80) + '...' : overview}
      </p>
    </div>
  );
};

export default MovieCard;
