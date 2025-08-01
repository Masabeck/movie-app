import React from 'react';
import {
  Card, CardActionArea, CardContent, CardMedia,
  Typography, IconButton, Box
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Movie } from '../types/Movie';
import { IMAGE_BASE_URL, FALLBACKS } from '../constants/tmdb';

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onClick,
  isFavorite,
  onToggleFavorite,
}) => {
  const {
    title,
    release_date,
    poster_path,
    vote_average,
    overview
  } = movie;

  const imageUrl = poster_path
    ? `${IMAGE_BASE_URL}w200${poster_path}`
    : FALLBACKS.cardPoster;

  return (
    <Card sx={{ width: 200, m: 2, bgcolor: '#f9f9f9' }}>
      <CardActionArea onClick={onClick}>
        <CardMedia
          component="img"
          height="300"
          image={imageUrl}
          alt={title}
        />
      </CardActionArea>

      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" gutterBottom noWrap>{title}</Typography>
          <IconButton onClick={onToggleFavorite} size="small" color="error">
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Box>

        <Typography variant="body2" color="text.secondary">
          {release_date?.slice(0, 4) || 'N/A'}
        </Typography>
        <Typography variant="body2" color="warning.main">
          ★ {vote_average?.toFixed(1)}
        </Typography>
        <Typography variant="body2" color="text.primary">
          {overview?.length > 80 ? overview.slice(0, 80) + '...' : overview}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
